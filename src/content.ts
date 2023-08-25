interface DictionaryEntry {
  homeHeader: string;
  homeContent: string;
  aboutHeader: string;
  aboutContent: string;
  hello: string;
}

export const langDictionary: Record<string, DictionaryEntry> = {
  "en-US": {
    hello: "Hello",
    homeHeader: "Home",
    homeContent: "Welcome to my home.",
    aboutHeader: "About Me",
    aboutContent:
      "Here is some information about me. English is my primary language.",
  },
  "ka-GE": {
    hello: "გამარჯობა",
    homeHeader: "გამარჯობა",
    homeContent: "მოგესალმებით მთავარ გვერდზე.",
    aboutHeader: "ჩვენ შესახებ",
    aboutContent: "ინფორმცია ჩემ შესახებ. ქართული ენა არის ჩემი პირველი ენა.",
  },
};
