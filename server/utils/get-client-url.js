
//2020-02-01th
// *** Return client (frontend) url (domain)

// export const getClientUrl = () => {
const getClientUrl = () => {

  let dev_url = process.env.CLIENT_DEVELOPMENT_URL
  let prod_url = process.env.CLIENT_PRODUCTION_URL


  if ( process.env.NODE_ENV === 'development' ) {
    return dev_url
  } else if ( process.env.NODE_ENV === 'production' ) {
    return prod_url
  } else {
    // return 'process.env.NODE_ENV = null'
    return '--- client url = null'
  }

}

module.exports = getClientUrl