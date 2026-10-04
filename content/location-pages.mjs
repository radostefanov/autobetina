import { regions } from './site-data.mjs';

export const placeKinds = {
  city: {bg:'Град',en:'Town',group:'settlement'},
  town: {bg:'Град',en:'Town',group:'settlement'},
  village: {bg:'Село',en:'Village',group:'settlement'},
  hamlet: {bg:'Махала',en:'Hamlet',group:'hamlet'},
  neighbourhood: {bg:'Квартал / вилна зона',en:'Neighbourhood',group:'neighbourhood'},
  suburb: {bg:'Квартал',en:'Neighbourhood',group:'neighbourhood'},
  locality: {bg:'Местност',en:'Locality',group:'locality'},
  junction: {bg:'Пътен възел',en:'Road junction',group:'road'},
  road: {bg:'Пътен участък',en:'Road section',group:'road'}
};

// Shared, factual templates: the place, coordinates and location type come from
// the saved map dataset. There are no invented local offices or arrival times.
export function locationGuide(place) {
  const parent = regions.find(r => r.id === place.parentRegion);
  const motorway = ['junction','road'].includes(place.kind);
  const bgName = place.bg, enName = place.en;
  return {
    bg: {
      title: `Пътна помощ ${bgName} | Репатрак Бетина 97`,
      heading: `Пътна помощ край ${bgName}`,
      description: `Автомобилът ви е аварирал край ${bgName}? Обадете се на Бетина 97 за репатрак и помощ в района. Точка на картата и безплатна оферта: 0878 558 152.`,
      intro: `Автомобилът ви е аварирал в района на ${bgName}? Свържете се с Бетина 97 за пътна помощ или репатрак. Уточняваме точната локация, достъпа, наличността и цената по телефон преди посещението.`,
      heading2: `Местоположение: ${bgName}`,
      text: `На картата е показан ориентир за ${bgName} в основния район. ${parent ? `Близък основен ориентир е ${parent.bg}. ` : ''}Точката е географски ориентир за мястото. За вашата заявка изпратете точната позиция на автомобила или посочете видим ориентир.`,
      prepare: motorway ? ['Посока на движение и километър или близък пътен възел.', 'Точно място на автомобила и достъпът до него.', 'Марка, модел, повреда и крайна точка, ако е нужен превоз.'] : [`${bgName}, улица, ориентир или точни GPS координати.`, 'Достъп до автомобила и кратко описание на повредата.', 'Марка, модел и желан сервиз или адрес за превоз.'],
      focus:['tow','tire','battery']
    },
    en: {
      title: `Roadside Assistance Near ${enName} | Betina 97`,
      heading: `Roadside assistance near ${enName}`,
      description: `Car broken down near ${enName}? Call Betina 97 for towing and roadside help. Find the place on the map and discuss a free quote: +359 878 558 152.`,
      intro: `Car broken down in or near ${enName}? Contact Betina 97 for roadside assistance or towing. We confirm your exact location, access, availability and price by phone before attending.`,
      heading2: `Location: ${enName}`,
      text: `${enName} is marked within the main area shown on the map. ${parent ? `A nearby main reference area is ${parent.en}. ` : ''}The point identifies the place geographically. For your request, share your vehicle’s exact position or a visible landmark.`,
      prepare: motorway ? ['Travel direction and kilometer marker or nearby junction.', 'Exact vehicle location and access to it.', 'Vehicle make, model, problem and destination if transport is needed.'] : [`${enName}, a street, landmark or exact GPS coordinates.`, 'Vehicle access and a short description of the problem.', 'Vehicle make, model and chosen workshop or transport address.'],
      focus:['tow','tire','battery']
    }
  };
}
