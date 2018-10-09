import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/demoPage.less';
const { LocaleProvider, zh_CN, Pagination, DatePicker, Button, Modal } = window.antd;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class DemoPage extends React.Component {
    state = {
        visible: false  
    }
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <div>
                    <Button onClick={()=>this.setState({visible:true})}>弹出弹框</Button>
                    <br/>
                    <Button onClick={()=>Modal.info({
                        iconType:' ',
                        content:'sds'
                    })}>弹出弹框</Button>
                    
                    <Pagination showQuickJumper defaultCurrent={2} total={500} />
                    <DatePicker  />
                    <br />
                    <MonthPicker  placeholder="Select month" />
                    <br />
                    <RangePicker  />
                    <br />
                    <WeekPicker  placeholder="Select week" />

                    <Modal 
                        visible={this.state.visible}
                        onCancel={()=>this.setState({visible:false})}
                        onOk={()=>this.setState({visible:false})}
                    >这是一个弹框</Modal>
                </div>
            </LocaleProvider>
        )
    }
}

ReactDOM.render(<DemoPage />, document.getElementById('root'))
