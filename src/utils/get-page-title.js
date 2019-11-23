import defaultSettings from '@/settings'

const title = defaultSettings.title || '融歆N9'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
