export function getInitials(name: string): string {
  if (!name) return ''

  const words = name.split(' ')
  let initials = ''

  for (const word of words) {
    if (initials.length < 2) {
      initials += word.charAt(0).toUpperCase()
    } else {
      break
    }
  }

  return initials
}

// Examples
// console.log(getInitials('John Doe')); // Output: JD
// console.log(getInitials('Jane')); // Output: J
// console.log(getInitials('John Michael Doe')); // Output: JM
// console.log(getInitials('A B C D')); // Output: AB
