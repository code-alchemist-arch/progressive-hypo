function thousandSeparator(value: any): string {
  // Zahlen mit vier Ziffern werden ohne Leerschlag geschrieben (Ausnahme siehe unten): CHF 5000
  if (value < 10000) {
    return '';
  }

  // Zahlen mit fünf oder mehr Ziffern werden in Mengenangaben von der letzten Stelle ausgehend in Dreiergruppen gegliedert: CHF 1 000 000; CHF 100 000
  return ' ';
}

export default thousandSeparator;
