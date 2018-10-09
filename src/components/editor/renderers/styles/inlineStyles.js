export default (props) => {

  const foreColorStyles = {}
  const backColorStyles = {}


  props.foreColors.forEach((color) => {
    let color_id = color.replace('#', '').toUpperCase()
    foreColorStyles['COLOR-' + color_id] = { color }
  })
  props.backColors.forEach((color) => {
    let color_id = color.replace('#', '').toUpperCase()
    backColorStyles['BGCOLOR-' + color_id] = { backgroundColor: color }
  })


  return {

    ...foreColorStyles,
    ...backColorStyles,
  }

}