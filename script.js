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
