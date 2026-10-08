const rituals = {
  morning: { kicker: 'ДЛЯ НАЧАЛА', name: 'Малиновое утро', description: 'Flat White + малиновый чизкейк' },
  pause: { kicker: 'ДЛЯ ПАУЗЫ', name: 'Ежевичный бархат', description: 'Эспрессо + шоколадный брауни с ежевикой' },
  slow: { kicker: 'ДЛЯ ЗАМЕДЛЕНИЯ', name: 'Черничное утро', description: 'Капучино + черничная тарталетка' },
  together: { kicker: 'ДЛЯ ВСТРЕЧИ', name: 'Вишнёвый нуар', description: 'Мокко + шоколадный торт с вишней' },
};

const feature = document.querySelector('#ritual-feature');
const featureKicker = document.querySelector('#ritual-kicker');
const featureName = document.querySelector('#ritual-name');
const featureDescription = document.querySelector('#ritual-description');
const options = document.querySelectorAll('.ritual-option');

options.forEach((option) => {
  option.addEventListener('click', () => {
    const ritual = rituals[option.dataset.ritual];
    options.forEach((item) => {
      item.classList.toggle('is-active', item === option);
      item.setAttribute('aria-selected', String(item === option));
    });
    feature.classList.add('is-changing');
    window.setTimeout(() => {
      featureKicker.textContent = ritual.kicker;
      featureName.textContent = ritual.name;
      featureDescription.textContent = ritual.description;
      feature.classList.remove('is-changing');
    }, 160);
  });
});

const ritualMenu = document.querySelector('#ritual-side-menu');
const ritualTrigger = document.querySelector('[data-open-ritual]');
const ritualScrim = document.querySelector('.ritual-scrim');
const sideOptions = ritualMenu.querySelectorAll('[data-side-ritual]');
const sidePanels = ritualMenu.querySelectorAll('[data-side-panel]');
const mainRitualButton = ritualMenu.querySelector('[data-main-ritual]');
const sideContent = ritualMenu.querySelector('.ritual-side-menu__content');
const mobileQuery = window.matchMedia('(max-width: 767px)');
function syncMobileMenuLayout() {
  const mobile = mobileQuery.matches;
  ritualMenu.classList.toggle('is-mobile-layout', mobile);
  document.body.classList.toggle('is-mobile-menu-layout', mobile);
  if (ritualMenu.classList.contains('is-open')) {
    sideOptions.forEach((option) => { option.hidden = mobile; });
    sideContent.hidden = mobile;
    ritualMenu.classList.remove('is-mobile-ritual', 'is-state-selected');
  }
}

syncMobileMenuLayout();
window.addEventListener('resize', syncMobileMenuLayout);

function closeRitualMenu() {
  ritualMenu.classList.remove('is-open');
  ritualMenu.setAttribute('aria-hidden', 'true');
  ritualMenu.inert = true;
  ritualScrim.hidden = true;
  document.body.classList.remove('ritual-menu-open');
  ritualTrigger.setAttribute('aria-expanded', 'false');
  ritualMenu.classList.remove('is-mobile-open');
  ritualMenu.classList.remove('is-mobile-ritual', 'is-state-selected');
}

ritualTrigger.addEventListener('click', () => {
  const mobile = mobileQuery.matches;
  sideOptions.forEach((option) => {
    const active = option.dataset.sideRitual === 'morning';
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-selected', String(active));
  });
  sidePanels.forEach((panel) => { panel.hidden = panel.dataset.sidePanel !== 'morning'; });
  sideOptions.forEach((option) => { option.hidden = mobile; });
  sideContent.hidden = mobile;
  ritualMenu.inert = false;
  ritualMenu.setAttribute('aria-hidden', 'false');
  ritualMenu.classList.add('is-open');
  ritualScrim.hidden = false;
  document.body.classList.add('ritual-menu-open');
  ritualTrigger.setAttribute('aria-expanded', 'true');
  ritualMenu.classList.toggle('is-mobile-open', mobile);
  ritualMenu.classList.remove('is-mobile-ritual', 'is-state-selected');
});

mainRitualButton.addEventListener('click', () => {
  if (mobileQuery.matches) {
    ritualMenu.classList.add('is-mobile-ritual');
    sideOptions.forEach((option) => { option.hidden = false; });
    sideContent.hidden = true;
  }
  sideOptions.forEach((option) => { option.hidden = false; });
  if (!mobileQuery.matches) sideContent.hidden = false;
  mainRitualButton.classList.add('is-active');
  mainRitualButton.setAttribute('aria-expanded', 'true');
});

ritualMenu.querySelectorAll('.ritual-side-menu__main-link:not([data-main-ritual])').forEach((item) => {
  item.addEventListener('click', () => {
    mainRitualButton.classList.remove('is-active');
    mainRitualButton.setAttribute('aria-expanded', 'false');
    sideOptions.forEach((option) => { option.hidden = true; });
    sideContent.hidden = true;
  });
});

ritualMenu.querySelector('.ritual-side-menu__mobile-logo').addEventListener('click', closeRitualMenu);
ritualMenu.querySelector('[data-back-main]').addEventListener('click', () => {
  ritualMenu.classList.remove('is-mobile-ritual', 'is-state-selected');
  sideOptions.forEach((option) => { option.hidden = true; });
  sideContent.hidden = true;
  mainRitualButton.setAttribute('aria-expanded', 'false');
});
document.querySelectorAll('[data-close-ritual]').forEach((control) => {
  control.addEventListener('click', closeRitualMenu);
});

sideOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const selected = option.dataset.sideRitual;
    sideOptions.forEach((item) => {
      const active = item === option;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    sidePanels.forEach((panel) => { panel.hidden = panel.dataset.sidePanel !== selected; });
    if (mobileQuery.matches) {
      sideContent.hidden = false;
      ritualMenu.classList.add('is-state-selected');
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && ritualMenu.classList.contains('is-open')) closeRitualMenu();
});

ritualMenu.querySelectorAll('.ritual-side-menu__card').forEach((card) => {
  card.addEventListener('click', () => closeRitualMenu());
});
