export function generateUID() {
  const random1 = (Math.random() * 46656) | 0;
  const random2 = (Math.random() * 46656) | 0;
  const firstPart = `000${random1.toString(36)}`.slice(-3);
  const secondPart = `000${random2.toString(36)}`.slice(-3);
  return firstPart + secondPart;
}
