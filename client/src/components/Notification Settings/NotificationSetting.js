import React, {useState, useCallback, useEffect} from 'react'
import {TextStyle, Layout, RadioButton, Select, OptionList, Checkbox, Button} from '@shopify/polaris';
import logo from '../../images/logo192.png';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import position_1 from '../../images/position_1.png';
import position_2 from '../../images/position_2.jpg';
import position_3 from '../../images/position_3.jpg';
import position_4 from '../../images/position_4.jpg';
import { addNotification, getNotification, syncData } from '../../actions/notification';
import Spinner from '../contents/Spinner';

const NotificationSetting = ({addNotification, getNotification, notification, loading, syncData}) => {
    useEffect(() => {
        getNotification();
    }, [getNotification])

    const options = [
        {label: 'Desktop device', value: 'Desktop device'},
        {label: 'Mobile device', value: 'Mobile device'},
        {label: 'All device', value: 'All device'},
    ];
    const optionTimes =[
        {label: '10/20/20', value: '10/20/20'},
        {label: '08/20/20', value: '08/20/20'},
        {label: '04/20/20', value: '04/20/20'},
        {label: '02/20/20', value: '02/20/20'},
        {label: '01/20/20', value: '01/20/20'}
    ]
    const [choose, choosed] = useState(notification.dateFormat);
    const handleOptionTimes = useCallback((value) =>  choosed(value), []);

    const optionsDate = [
        {label: 'Date time', value: 'Date time'},
        {label: 'Time ago', value: 'Time ago'},
    ];
    const [selectedDate, setSelectedDate] = useState('Time ago');
    const handleSelectChangeDate = useCallback((value) => setSelectedDate(value), []);

    const optionsShow = [
        {label: 'Random', value: 'Random'},
        {label: 'Lastest', value: 'Lastest'}
    ];
    const [selectedShow, setSelectedShow] = useState('Random');
    const handleSelectChangeShow = useCallback((value) => setSelectedShow(value), []);

    const optionsSelect = [
        {label: 'Live Order', value: 'Live order'},
        {label: 'Fake Order', value: 'Fake Order'},
        {label: 'All Order', value: 'All Order'},
    ];
    const [selectedOrderSelect, setSelectOrderSelect] = useState(notification.selectOrder);
    const handleSelectOrder = useCallback((value) => setSelectOrderSelect(value), []);

    const [positionValue, setPosition] = useState(notification.position);
    const handleChangePosition = useCallback(
      (_checked, newValue) => setPosition(newValue),
      [],
    );
    const [formDisplay, setFormDisplay] = useState(notification.notiDisplay);
    const {display} = formDisplay;

    const [formHide, setFormHide] = useState(notification.notiHidden);
    const {hidden} = formHide;

    const [stateEffect, setStateEffect] = useState(false);
    const handleChange = useCallback(() => setStateEffect(!stateEffect), [stateEffect]);

    const [selected, setSelected] = useState('Live Order');
    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const [selectedOrder, setSelectedOrder] = useState(notification.orderStatus.split(","));

    const [checkedOrder, setCheckedOrder] = useState(notification.showOrder);
    const handleChangeOrder = useCallback((newChecked) => setCheckedOrder(newChecked), []);

    const [color, setColor] = useState(notification.highlightColor);
    const onChangeColor = (e) => {
        setColor([e.target.name]= e.target.value)
    };

    const [colorText, setColorText] = useState(notification.textColor);
    const onChangeColorText = (e) => {
        setColorText([e.target.name]= e.target.value)
    };

    const [colorDate, setColorDate] = useState(notification.colorDate);
    const onChangeColorDate = (e) => {
        setColorDate([e.target.name]= e.target.value)
    };

    const [borderRadius, setBorderRadius] = useState(notification.borderRadius);
    const onChangeBorderRadius = (e) => {setBorderRadius([e.target.name]=e.target.value)}

    
    var today = new Date(),
    date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();


    const onChange= (e) => {
        setFormDisplay({...formDisplay, [e.target.name]: e.target.value});
    };
    const onChangeHide = (e) => {
        setFormHide({...formHide, [e.target.name]: e.target.value});
    };

    const initialState = {
        showOrder: '', 
        selectOrder: '', 
        numberOfLive: '', 
        orderStatus: '',
        nextTimeDisplay: '',
        displaytime: '',
        dateFormat: '',
        showDevices: '',
        customText: '',
        notiDisplay: '',
        notiHidden: '',
        position: '',
        highlightColor: '#000000',
        textColor: '#000000',
        colorDate: '#000000',
        borderRadius: ''
    };

    const notify = notification.position

    const [formData, setFormData] = useState(initialState);
    formData.position = positionValue;
    formData.showOrder = JSON.stringify(checkedOrder);
    formData.selectOrder = selectedOrderSelect;
    formData.orderStatus = selectedOrder + "";
    formData.dateFormat = choose;
    formData.showDevices = selected;
    formData.notiDisplay = display;
    formData.notiHidden = hidden;
    formData.highlightColor = color
    formData.textColor = colorText
    formData.colorDate = colorDate
    formData.borderRadius = borderRadius;
    const {customText} = formData;
    const onChangeData = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        addNotification(formData);
    }

    return (
        <>
            {loading ? (
                <Spinner />
                ) : (
                <div className='mt-3 mb-3'>
                    <div style={{textAlign:'right'}}>
                        <Button primary onClick={() => syncData()}>SYNC DATA</Button>
                    </div>
                    <form onSubmit={onSubmit}>
                        {/* Show Order */}
                        <div className='mb-3'>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Show Order Notifications</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <Checkbox
                                        checked={checkedOrder}
                                        onChange={handleChangeOrder}
                                    />
                                </Layout.Section> 
                            </Layout>
                        </div>
                        {/* Select Order */}
                        <div className='mb-3'>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Select Order</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <div style={{width:'250px'}}>
                                        <Select
                                            options={optionsSelect}
                                            onChange={handleSelectOrder}
                                            value={selectedOrderSelect}
                                        />
                                    </div>
                                </Layout.Section> 
                            </Layout>  
                        </div>
                        {/* Custom order */}
                        <div className='mb-3'>
                            <div className='mb-3'>
                                <Layout>
                                    <Layout.Section secondary>
                                        <TextStyle variation='strong'>Show Custiom Order</TextStyle>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <div className='input-md'>
                                            <Select
                                                options={optionsShow}
                                                onChange={handleSelectChangeShow}
                                                value={selectedShow}
                                            />
                                        </div>
                                    </Layout.Section> 
                                </Layout>
                            </div>
                            {selectedShow === 'Random' ? (
                                <div className='mb-3'>
                                    <Layout>
                                        <Layout.Section secondary>
                                            <TextStyle variation='strong'>Number of Live Order to show</TextStyle>
                                        </Layout.Section>
                                        <Layout.Section>
                                            <div className='input-sm'>
                                                <input className='input-form' type='number' name='numberOfLive' defaultValue={notification.numberOfLive} onChange={onChangeData} />
                                            </div>
                                        </Layout.Section> 
                                    </Layout> 
                                </div>)
                                : ''
                            }
                        </div>
                        {/* Order Status */}
                        <div className='mb-3'>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Order status</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <div className='option'>

                                    <OptionList
                                    onChange={setSelectedOrder}
                                    options={[
                                    {value: 'Pending', label: 'Pending'},
                                    {value: 'Paid', label: 'Paid'},
                                    {value: 'Refunded', label: 'Refunded'},
                                    ]}
                                    selected={selectedOrder}
                                    allowMultiple>
                                    </OptionList>
                                    </div>
                                </Layout.Section> 
                            </Layout>
                        </div>
                        {/* Display time */}
                        <div className='mb-3'>
                            <div className='mb-3'>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Next time display</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <div className='time-display'>
                                        <input className='input-form' type='number' name='nextTimeDisplay' defaultValue= {notification.nextTimeDisplay} onChange={onChangeData}/>
                                        <span className='seconds'>seconds</span>
                                    </div>
                                </Layout.Section> 
                            </Layout>
                            </div>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Display time</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <div className='time-display'>
                                        <input className='input-form' type='number' name='displaytime' defaultValue= {notification.displaytime} onChange={onChangeData}/>
                                        <span className='seconds'>seconds</span>
                                    </div>
                                </Layout.Section> 
                            </Layout>
                        </div>
                        {/* Select Date */}
                        <div className='mb-3'>
                            <div className="mb-3">
                                <Layout >
                                    <Layout.Section secondary>
                                        <TextStyle variation='strong'>Select Date Format</TextStyle>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <div className='input-md'>
                                            <Select
                                                options={optionsDate}
                                                onChange={handleSelectChangeDate}
                                                value={selectedDate}
                                            />
                                        </div>
                                    </Layout.Section> 
                                </Layout>  
                            </div>
                            {selectedDate === 'Date time' ? (
                                <div className="mb-3">
                                    <Layout>
                                        <Layout.Section secondary>
                                        </Layout.Section>
                                        <Layout.Section>
                                            <TextStyle variation='strong'>Chose date format</TextStyle>
                                            <div className="input-md">
                                                <Select
                                                options={optionTimes}
                                                onChange={handleOptionTimes}
                                                value={choose}
                                                />
                                            </div>
                                        </Layout.Section>
                                    </Layout>
                                </div>
                            ) : ''}     
                    
                        </div>

                        {/* Show device */}
                        <div className='mb-3'>
                            <Layout >
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Select show device</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <div style={{width:'250px'}}>
                                        <Select
                                            options={options}
                                            onChange={handleSelectChange}
                                            value={selected}
                                        />
                                    </div>
                                </Layout.Section> 
                            </Layout>  
                        </div>
                        {/* Custom Text */}
                        <div className='mb-3'>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Custom Text</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                        <input className='input-form' type='text' name= 'customText' defaultValue= {notification.customText} onChange={onChangeData}/>
                                        <p className='note-text p-0'>
                                        If you want to show the customer's name, lets put "%name" you in the text box. Do the same with the customer's city.
                                        Or instead of show the customer's name you can replace "%name" with "Someone". And "%city" it works with city.
                                        Example: Someone in Ha Noi, Viet Nam purchased
                                        </p>
                                </Layout.Section> 
                            </Layout> 
                        </div>
                        {/* Effect */}
                        <div className='mb-3'>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Message display effect</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <select className='option-list' name='display' defaultValue={notification.notiDisplay} onClick={() => setStateEffect(true)} onChange={onChange} style={{width:'250px', height: '40px', margin:0, padding:'5px'}}>
                                        <optgroup label='Attention Seekers'>
                                            <option value='bounce'>Bounce</option>
                                            <option value='flash'>Flash</option>
                                            <option value='pulse'>Pulse</option>
                                            <option value='shakeX'>ShakeX</option>
                                            <option value='bounce out up'>Bounce out up</option>
                                            <option value='shakeY'>ShakeY</option>
                                            <option value='swing'>Swing</option>
                                            <option value='tada'>tada</option>
                                            <option value='jello'>Jello</option>
                                            <option value='backInDown'>Back In Down</option>
                                            <option value='heartBeat'>Bounce out up</option>
                                            <option value='bounceInLeft'>Bounce in left</option>
                                        </optgroup>
                                    </select> 
                                </Layout.Section> 
                            </Layout>
                        </div>
                        <Layout>
                            <Layout.Section secondary>
                                <TextStyle variation='strong'>Message hidden effect</TextStyle>
                            </Layout.Section>
                            <Layout.Section>
                                <select  className='option-list' name='hidden' defaultValue={notification.notiHidden} onClick={() => setStateEffect(true)}  onChange={onChangeHide} style={{width:'250px', height: '40px', margin:0, padding:'5px'}}>
                                    <optgroup label='Bouncing Exit'>
                                        <option value='fadeOutBig'>fadeOutBig</option>
                                        <option value='bounceOut'>Bounce Out</option>
                                        <option value='bounceOutDown'>bounceOutDown</option>
                                        <option value='bounceOutLeft'>bounceOutLeft</option>
                                        <option value='bounceOutRight'>bounceOutRight</option>
                                        <option value='bounceOutUp'>bounceOutUp</option>
                                        <option value='fadeOut'>fadeOut</option>
                                        <option value='fadeOutLeftBig'>fadeOutLeftBig</option>
                                        <option value='fadeOutRightBig'>fadeOutRightBig</option>
                                        <option value='fadeOutUpBig'>fadeOutUpBig</option>
                                    </optgroup>
                                </select> 
                            </Layout.Section> 
                        </Layout>
                        
                        {/* Position */}
                        <div className='mb-3 mt-3'>
                            <Layout>
                                <Layout.Section secondary>
                                    <TextStyle variation='strong'>Position</TextStyle>
                                </Layout.Section>
                                <Layout.Section>
                                    <ul className='img-list'>
                                        <li className='img-sm'>
                                            <label htmlFor="bottomLeft">
                                                <img alt='Nothing'  className='img' src={position_1}/>
                                            </label>
                                            <br/>
                                            <div style={{textAlign:'center'}}>
                                                
                                            <RadioButton
                                                checked={positionValue === 'bottomLeft'}
                                                id="bottomLeft"
                                                name="position"
                                                onChange={handleChangePosition}
                                            />
                                            </div>
                                        </li>
                                        <li className='img-sm'>
                                            <label htmlFor="bottomRight">
                                                <img alt='Nothing' className='img' src={position_2}/>
                                            </label>
                                            <br/>
                                            <div style={{textAlign:'center'}}>
                                                
                                            <RadioButton
                                                checked={positionValue === 'bottomRight'}
                                                id="bottomRight"
                                                name="position"
                                                onChange={handleChangePosition}
                                            />
                                            </div>
                                        </li>
                                        <li className='img-sm'>
                                            <label htmlFor="topRight">
                                                <img alt='Nothing' className='img' src={position_3}/>
                                            </label>
                                            <br/>
                                            <div style={{textAlign:'center'}}>
                                                
                                            <RadioButton
                                                checked={positionValue === 'topRight'}
                                                id="topRight"
                                                name="position"
                                                onChange={handleChangePosition}
                                            />
                                            </div>
                                        </li>
                                        <li className='img-sm'>
                                            <label htmlFor="topLeft">
                                                <img alt='Nothing' className='img' src={position_4}/>
                                            </label>
                                            <br/>
                                            <div style={{textAlign:'center'}}>
                                                
                                            <RadioButton
                                                checked={positionValue === 'topLeft'}
                                                id="topLeft"
                                                name="position"
                                                onChange={handleChangePosition}
                                            />
                                            </div>
                                        </li>
                                    </ul>
                                </Layout.Section> 
                            </Layout>
                        </div>

                        {/* Color picker */}
                        <div className='mt-5 mb-3'>
                            <div className='mt-3 mb-3'>
                                <Layout>
                                    <Layout.Section secondary>
                                        <TextStyle variation='strong'>Highlight color</TextStyle>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <img alt='nothing' style={{paddingRight: "10px"}} src= "chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" />
                                        <input className='inputColor' name='color' value= {color} onChange={onChangeColor} type='color' />
                                    </Layout.Section> 
                                </Layout>
                            </div>
                            <div className='mb-3'>
                                <Layout>
                                    <Layout.Section secondary>
                                        <TextStyle variation='strong'>Text color</TextStyle>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <img alt='nothing' style={{paddingRight: "10px"}} src= "chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" />    
                                        <input className='inputColor' name='colorText' value={colorText} onChange={onChangeColorText}  type='color' />
                                    </Layout.Section> 
                                </Layout>
                            </div>
                            <div className='mb-3'>
                                <Layout>
                                    <Layout.Section secondary>
                                        <TextStyle variation='strong'>Color Date</TextStyle>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <img alt='nothing' style={{paddingRight: "10px"}} src= "chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" />
                                        <input className='inputColor' name='colorDate' value={colorDate} onChange={onChangeColorDate}  type='color' />
                                    </Layout.Section> 
                                </Layout>
                            </div>
                            <div className='mb-3'>
                                <Layout>
                                    <Layout.Section secondary>
                                        <TextStyle variation='strong'>Border Radius</TextStyle>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <div className='input-sm'>
                                                <input className='input-form' type='number' name='borderRadius' defaultValue= {borderRadius} onChange={onChangeBorderRadius} />
                                        </div>
                                    </Layout.Section> 
                                </Layout>
                            </div>
                        </div>  
                        {/* Footer */}
                        <div className='mb-3 mt-3'>
                            <Layout>
                                <Layout.Section secondary>
                                </Layout.Section>
                                <Layout.Section>
                                    <Button size='large' primary submit={true}>Save</Button>
                                </Layout.Section> 
                            </Layout>
                        </div>
                        {/* <Notification effect = {display} hide = {hidden} /> */}
                        <div>
                            {stateEffect === true ? (              
                                <div style={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', bottom: notify === "bottomLeft" ? "4vh" : notify === "topLeft" ? "75vh" :  notify === "bottomRight" ? "4vh" : "75vh" , right: notify === "bottomRight" ? "0" : notify === "topRight" ? "0" : "", animationFillMode: "backwards"}} id='show-demo' className= {`animate__animated animate__${hidden} animate__${display} notification`}>
                                        <div style={{padding: 0}}>
                                            <div xs='2' style={{display:'flex'}}>
                                                <div md='4' xs='4' style={{width:'100px'}}>
                                                    <img className='img_demo' alt='nothing' src={logo} />  
                                                </div>                          
                                                <div md='8' xs='8' style={{padding: '0 15px'}} >
                                                    <a href='#' onClick={handleChange} className='hide_demo'>
                                                    <i className="fa fa-times-circle"></i>
                                                    </a>
                                                    <h5 style={{color: `${color}`, padding: '0 0 6px 10px', fontSize: '16px'}}>Omega in Ha Noi, Viet Nam purchased</h5>
                                                    <h2 style={{color: `${colorText}`, padding: '0 0 4px 10px', fontWeight: 500}}>Lorem ipsum dolor</h2>
                                                    <p style={{color: `${colorDate}`, padding: '0 0 8px 10px', fontSize: '12px'}}>Date: { date} </p>
                                                </div>                           
                                            </div>
                                        </div>
                                </div>  
                            ) : null}
                        </div>
                    </form>     
                </div>
            )}
        </>
    )
}

NotificationSetting.propTypes = {
    getNotification: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    syncData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    loading: state.notification.loading
})

export default connect(mapStateToProps, {addNotification, getNotification, syncData})(NotificationSetting)
