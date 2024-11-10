export const isValidUrl = (string: string) => {
   try {
      new URL(string)
      return true
   } catch (_) {
      return false
   }
}

export const toTitleCase = (str: string): string => {
   return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

export const categoryMapping: { [key: string]: string[] } = {
   jobs: ['govt-jobs', 'non-govt-jobs'],
   newspaper: ['newspaper'],
   'admit-and-result': ['result', 'admit-card'],
   others: ['technology', 'entertainment', 'others'],
}

export const mapCategory = (category: string): string[] => {
   return categoryMapping[category] || []
}
