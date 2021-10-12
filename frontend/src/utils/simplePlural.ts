export function simplePlural(str: string, items: number) {
  return str + (items > 1 ? 's' : '')
}
