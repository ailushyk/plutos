export function sleep(number: number = 2000) {
  return new Promise((resolve) => setTimeout(resolve, number))
}
