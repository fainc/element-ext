const LoadJson = async (name) => {
  const data = await import(`./lang/${name}.json`)
  return data.default
}
export default LoadJson
