import ColorPicker from './colorPicker'

export default class BackColorPicker extends React.PureComponent {

    render() {

        return <ColorPicker colors={this.props.backColors} prefix="backColor" {...this.props}/>
    }
}