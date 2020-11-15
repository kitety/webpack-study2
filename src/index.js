import { helloworld } from './helloworld'
import React from 'react'
import ReactDom from 'react-dom'
import './index.less'
import img from './images/img.png'

class Search extends React.Component {
  render () {
    return <div>1132444432311<img src={img} /></div>
  }
}
ReactDom.render(<Search />, document.getElementById('root'))
