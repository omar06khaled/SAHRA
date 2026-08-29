export interface Question {
  q: string;
  a: string;
}

export interface Category {
  id: string;
  title: string;
  sub: string;
  ink: number;
  qs: Question[];
}

export const POOL: Category[] = [
  { id: 'cine', title: 'El Cinema2i', sub: 'Films, stars and the lines everyone quotes', ink: 0, qs: [
    { q: 'What is the Arabic word for cinema?', a: 'Sinima' },
    { q: 'A film shot in one apartment with four actors is usually called what kind of film?', a: 'A chamber film' },
    { q: 'In film credits, who is responsible for the lighting and the camera?', a: 'The cinematographer' },
    { q: 'What does a film festival jury hand out at the end of the week?', a: 'The awards' },
    { q: 'A film released for the Eid holiday season is competing for which audience?', a: 'The family audience' },
    { q: 'What is the term for the short version of a film cut to sell it?', a: 'The trailer' } ] },
  { id: 'kora', title: 'Kora', sub: 'Football, from the street to the league', ink: 1, qs: [
    { q: 'How many players from one side are on the pitch at kick-off?', a: 'Eleven' },
    { q: 'How long is a football match, not counting stoppage time?', a: '90 minutes' },
    { q: 'What colour card sends a player off?', a: 'Red' },
    { q: 'How often is the men’s FIFA World Cup held?', a: 'Every four years' },
    { q: 'What is the name for three goals by one player in a single match?', a: 'A hat-trick' },
    { q: 'From what distance is a penalty kick taken?', a: 'Eleven metres' } ] },
  { id: 'kalam', title: 'Kalam El 3ela', sub: 'Household sayings, habits and house rules', ink: 2, qs: [
    { q: 'What do you say to someone who has just had a haircut or a bath?', a: 'Na’eeman' },
    { q: 'Who in the family is traditionally asked to settle an argument?', a: 'The eldest' },
    { q: 'What is the standard reply to “shukran”?', a: 'Al ‘afw' },
    { q: 'What do guests bring when invited to dinner?', a: 'Sweets' },
    { q: 'What is the word for the visit paid to a family after good news?', a: 'Mabrouk visit' },
    { q: 'Who traditionally pours the tea for the room?', a: 'The youngest' } ] },
  { id: 'akl', title: 'Akl El Beit', sub: 'Home cooking and what is on the table', ink: 3, qs: [
    { q: 'What grain is the base of koshari?', a: 'Rice' },
    { q: 'Which leaf is chopped fine to make mulukhiya?', a: 'Jute mallow' },
    { q: 'What is the pulse used for ful medames?', a: 'Fava beans' },
    { q: 'What is bread called in Egyptian Arabic?', a: '‘Eish' },
    { q: 'Which spice mix of nuts and seeds is eaten with bread and oil?', a: 'Dukkah' },
    { q: 'What syrup-soaked pastry is filled with nuts or cream at Ramadan?', a: 'Kunafa' } ] },
  { id: 'agh', title: 'Aghani Zaman', sub: 'Old songs and the voices behind them', ink: 4, qs: [
    { q: 'What is the Arabic word for song?', a: 'Ughniya' },
    { q: 'What is the name of the singer who leads a group performance?', a: 'The soloist' },
    { q: 'Which string instrument with a bent neck anchors classical Arabic music?', a: 'The oud' },
    { q: 'What is the word for the improvised vocal opening before a song?', a: 'Mawwal' },
    { q: 'What do you call the group of instrumentalists behind a singer?', a: 'The takht' },
    { q: 'Which percussion instrument is a large frame drum played with the fingers?', a: 'The riqq' } ] },
  { id: 'masr', title: 'Masr Fein?', sub: 'Places, roads and where things are', ink: 5, qs: [
    { q: 'Which river runs through Cairo?', a: 'The Nile' },
    { q: 'Which sea lies to the north of Egypt?', a: 'The Mediterranean' },
    { q: 'Which canal links the Mediterranean to the Red Sea?', a: 'The Suez Canal' },
    { q: 'What is the capital of Egypt?', a: 'Cairo' },
    { q: 'Which city sits at the western end of the Nile Delta on the coast?', a: 'Alexandria' },
    { q: 'What is the name of the large lake formed behind the Aswan High Dam?', a: 'Lake Nasser' } ] },
  { id: 'mos', title: 'Mosalsalat', sub: 'Series, seasons and the Ramadan slate', ink: 1, qs: [
    { q: 'How many episodes does a standard Ramadan series usually run?', a: 'Thirty' },
    { q: 'What is the word for one instalment of a series?', a: 'An episode' },
    { q: 'What is the opening sequence of a series called?', a: 'The titles' },
    { q: 'A series that continues the same story a year later is called what?', a: 'A second season' },
    { q: 'What is the term for the very last episode?', a: 'The finale' },
    { q: 'What is the person who writes the series called?', a: 'The screenwriter' } ] },
  { id: 'sa7', title: 'Sa7 wala Ghalat', sub: 'True or false, no half marks', ink: 3, qs: [
    { q: 'True or false: the Nile flows south to north.', a: 'True' },
    { q: 'True or false: a camel stores water in its hump.', a: 'False — it stores fat' },
    { q: 'True or false: Arabic is written right to left.', a: 'True' },
    { q: 'True or false: the Sahara is the largest hot desert on earth.', a: 'True' },
    { q: 'True or false: sound travels faster in water than in air.', a: 'True' },
    { q: 'True or false: a tomato is botanically a fruit.', a: 'True' } ] },
  { id: 'sana', title: 'Ay Sana?', sub: 'Name the year, nearest guess takes it', ink: 2, qs: [
    { q: 'In which year did the twentieth century begin?', a: '1901' },
    { q: 'In which year did the first people land on the moon?', a: '1969' },
    { q: 'In which year did the Second World War end?', a: '1945' },
    { q: 'In which year was the Suez Canal opened?', a: '1869' },
    { q: 'In which year was the tomb of Tutankhamun found?', a: '1922' },
    { q: 'In which year was the Aswan High Dam completed?', a: '1970' } ] },
  { id: 'kelma', title: 'Kelma Kelma', sub: 'Words, letters and one-word answers', ink: 0, qs: [
    { q: 'How many letters are in the Arabic alphabet?', a: 'Twenty-eight' },
    { q: 'What is a word that reads the same forwards and backwards called?', a: 'A palindrome' },
    { q: 'What is the term for two words that sound alike but differ in meaning?', a: 'Homophones' },
    { q: 'What do you call the three-letter core that Arabic words are built from?', a: 'The root' },
    { q: 'What is the name for a word borrowed unchanged from another language?', a: 'A loanword' },
    { q: 'What is the word for a saying the whole family repeats?', a: 'A proverb' } ] },
  { id: 'farah', title: 'Gawaz w Farah', sub: 'Weddings, engagements and the whole procession', ink: 4, qs: [
    { q: 'What is the name of the procession that walks the couple in?', a: 'The zaffa' },
    { q: 'What is the word for the engagement party?', a: 'Khotouba' },
    { q: 'Who traditionally holds the rings before the ceremony?', a: 'The best man' },
    { q: 'What is the sweet drink served at engagements?', a: 'Sharbat' },
    { q: 'What is the written marriage contract called?', a: 'Katb el kitab' },
    { q: 'What do guests do with the bouquet at the end of the night?', a: 'Catch it' } ] },
  { id: 'share3', title: 'El Share3', sub: 'Getting around, and what it costs', ink: 5, qs: [
    { q: 'What is the shared minibus most people take called?', a: 'A microbus' },
    { q: 'How many lines does the Cairo metro run?', a: 'Three' },
    { q: 'What do you call the person who collects the fare on a bus?', a: 'The conductor' },
    { q: 'What is the three-wheeled vehicle used in narrow streets?', a: 'A tuk-tuk' },
    { q: 'What is the word for the roadside kiosk selling everything?', a: 'A kushk' },
    { q: 'What colour are Cairo taxis?', a: 'White' } ] },
  { id: 'beit', title: 'Fi El Beit', sub: 'Objects, rooms and how the house works', ink: 2, qs: [
    { q: 'What is the covered balcony room called?', a: 'A veranda' },
    { q: 'What do you call the tall glass used for tea?', a: 'A kobbaya' },
    { q: 'What is the small copper pot for making coffee called?', a: 'A kanaka' },
    { q: 'What is the name for the roof-level water tank?', a: 'A khazan' },
    { q: 'What do you call the fold-down guest bed?', a: 'A sofa bed' },
    { q: 'What is the room kept tidy only for guests called?', a: 'The salon' } ] },
  { id: 'raqam', title: 'Raqam Kam?', sub: 'Numbers, prices and how many', ink: 3, qs: [
    { q: 'How many governorates does Egypt have?', a: 'Twenty-seven' },
    { q: 'How many days are in a lunar year?', a: '354' },
    { q: 'How many players are in a volleyball team on court?', a: 'Six' },
    { q: 'How many pyramids stand on the Giza plateau?', a: 'Three' },
    { q: 'How many strings does an oud usually have?', a: 'Eleven' },
    { q: 'How many hours ahead of GMT is Cairo in winter?', a: 'Two' } ] }
];

export const byId = (id: string): Category => {
  const cat = POOL.find((p) => p.id === id);
  if (!cat) throw new Error(`Unknown category id: ${id}`);
  return cat;
};
