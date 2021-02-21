const small = (): boolean => window.matchMedia('(min-width: 576px)').matches

const medium = (): boolean => window.matchMedia('(min-width: 768px)').matches

const large = (): boolean => window.matchMedia('(min-width: 992px)').matches

const extraLarge = (): boolean => window.matchMedia('(min-width: 1200px)').matches
