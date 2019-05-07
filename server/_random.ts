// Random content

function randomInteger(min: number, max: number): number {
  const range = Math.random() * (max - min);
  return min + Math.round(range);
}

function randomDate(): Date {
  return new Date(randomInteger(10000000000, 1000000000000));
}

function randomText(length: number): string {
  let id: string = '';
  for (let i=0; i<length; i++) {
    id += randomInteger(0, 255).toString(16);
  }
  return id.substr(0, length);

}

function randomId(): string {
  return randomText(8);
}

module.exports = {
  randomInteger,
  randomDate,
  randomText,
  randomId
};
