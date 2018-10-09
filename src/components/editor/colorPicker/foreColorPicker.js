import ColorPicker from './colorPicker'
export default class ForeColorPicker extends React.PureComponent {

    render() {

        return <ColorPicker colors={this.props.foreColors} prefix="foreColor" {...this.props}/>
    }
}