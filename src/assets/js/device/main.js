function tooltip (msg, x, y, width, height, radius) {
  var arrowHeight, arrowWidth, fillColor, fontColor, g, shadowColor
  fillColor = '#fff'
  shadowColor = '#000'
  fontColor = '#000'
  arrowWidth = 6
  arrowHeight = 6
  var container = new createjs.Container()
  var shape = new createjs.Shape()
  g = shape.graphics
  g.beginFill(fillColor)
  g.drawRoundRect(0, 0, width, height - arrowHeight, radius)
  g.moveTo((width * 0.5) - arrowWidth, height - arrowHeight)
  g.lineTo(width * 0.5, height)
  g.lineTo((width * 0.5) + arrowWidth, height - arrowHeight)
  g.endFill()
  shape.shadow = new createjs.Shadow(shadowColor, 0, 0, 6)
  shape.alpha = 0.6
  var text = new createjs.Text(msg, '12px Arial', fontColor)
  text.textAlign = 'center'
  text.textBaseline = 'bottom'
  text.maxWidth = width
  text.x = width * 0.5
  text.y = ((height + 4 - arrowHeight) + text.getMeasuredHeight()) * 0.5
  container.addChild(shape, text)
  container.x = x
  container.y = y
  return container
}
