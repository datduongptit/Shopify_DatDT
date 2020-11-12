import React, {useState, useCallback, useEffect} from 'react';
import {TextStyle, Layout, RadioButton, Select, Button} from '@shopify/polaris';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addRealtimeSetting, getRealtimeSetting} from '../../actions/realtime';
import position_1 from '../../images/position_1.png';
import position_2 from '../../images/position_2.jpg';
import position_3 from '../../images/position_3.jpg';
import position_4 from '../../images/position_4.jpg';
import Spinner from '../contents/Spinner';

const LayoutPopup = ({addRealtimeSetting, getRealtimeSetting, realtime: {loading}, realtimeSetting}) => {
    useEffect(() => {
        getRealtimeSetting();
        }, [getRealtimeSetting, loading]);
    const [checked, setChecked] = useState('gradient');
    const handleChange = useCallback(
        (_checked, newValue) => setChecked(newValue),
        [],
    );

    const options = [
        {label: 'Correct views', value: 'Correct views'},
        {label: 'Random views', value: 'Random views'},
    ];

    const [positionValue, setPosition] = useState(realtimeSetting.position);

    const handleChangePosition = useCallback(
      (_checked, newValue) => setPosition(newValue),
      [],
    );

    const [orderChecked, setOrderChecked] = useState(realtimeSetting.show_product);
    const [selected, setSelected] = useState('Correct views');
    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const [colorLeft, setColorLeft] = useState(realtimeSetting.background_left);
    const onChangeColorLeft = (e) => {setColorLeft([e.target.name] = e.target.value)};

    const [colorRight, setColorRight] = useState(realtimeSetting.background_right);
    const onChangeColorRight = (e) => {setColorRight([e.target.name] = e.target.value)};

    const [color, setColor] = useState(realtimeSetting.background_color);
    const onChangeColor = (e) => {setColor([e.target.name] = e.target.value)};

    const [colorText, setColorText] = useState(realtimeSetting.color_text);
    const onChangeColorText = (e) => {setColorText([e.target.name] = e.target.value)};

    const [customText, setCustomText] = useState(realtimeSetting.custom_text);
    const onChangeText = (e) => {setCustomText([e.target.name] = e.target.value)};

    const initialState = {
        show_product: '',
        background_left: '',
        background_right: '',
        background_color: '',
        end: '0', 
        from: '0',
        custom_text: 'Testing',
        color_text: '',
        position: '',
    }

    const [formData, setFormData] = useState(initialState);
    formData.show_product = orderChecked;
    formData.position = positionValue;
    formData.background_left = colorLeft;
    formData.background_right = colorRight;
    formData.background_color = color;
    formData.color_text = colorText;
    formData.custom_text = customText;
    const onChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value})};  
    const onSubmit = (e) => {
        e.preventDefault();
        addRealtimeSetting(formData);
    }
    return (
    <> 
        {loading ? (
        <Spinner />
            ) : (
        <form onSubmit={onSubmit}>
            <div className='mb-3 mt-3'>
                <Layout>
                    <Layout.Section secondary>
                        <TextStyle variation='strong'>Show Order Notifications</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                        <input style={{zoom: 1.4}} type='checkbox' name='orderChecked' value={Boolean(realtimeSetting.show_product)} defaultChecked={Boolean(orderChecked)} onChange={() => setOrderChecked(!Boolean(orderChecked))} />
                    </Layout.Section> 
                </Layout>
            </div>
            <div className='mb-3 mt-3'>
                <Layout>
                    <Layout.Section secondary>
                        <TextStyle variation='strong'>Layout Popup</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                        <Layout.Section secondary>
                            <TextStyle>Background Gradient:</TextStyle>
                                <Layout.Section>
                                    <div style={{display:'flex'}}>
                                        <RadioButton
                                            checked={checked === 'gradient'}
                                            onChange={handleChange}
                                            id='gradient'
                                            name='checked'
                                        />
                                        <div className='gradient' style={{background: `linear-gradient(90deg,${colorLeft}, ${colorRight})`}}>
                                            <i style={{color: '#fff'}} className='fa fa-users'></i>
                                            <span style={{color:`#fff`, fontWeight:600, marginTop: 50, alignItems: 'center', fontSize: 16}}> {customText}
                                            </span>
                                        </div>
                                    </div>
                                </Layout.Section>
                                <div className="mt-3 mb-3" style={{display:'flex'}}>
                                    <div style={{paddingRight: '15px'}}>
                                        <span style={{fontWeight:600}}>Background left:  </span>
                                        <img alt="Nothing" style={{paddingRight: "10px"}} src= "chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" />
                                        <input type='color' name='background_left' defaultValue={colorLeft} className='color' onChange={onChangeColorLeft} />
                                    </div>
                                    <div>
                                        <span style={{fontWeight:600}}>Background right: </span>
                                        <img alt="Nothing" style={{paddingRight: "10px"}} src= "chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" />
                                        <input type='color' name='background_right' defaultValue={colorRight} className='color' onChange={onChangeColorRight} />
                                    </div>
                                        
                                </div>
                        </Layout.Section> 
                        <Layout.Section secondary>
                        <TextStyle>Background Color:</TextStyle>
                        <Layout.Section>
                            <div style={{display:'flex'}}>
                                <RadioButton
                                    checked={checked === 'background_color'}
                                    onChange={handleChange}
                                    id='background_color'
                                    name='checked'
                                />
                                <div className='gradient' style={{backgroundColor: color}}>
                                    <i style={{color: colorText}} className='fa fa-users'></i>
                                    <span style={{color:`${colorText}`, fontWeight:600, alignItems: 'center', fontSize: 16}}> {customText} 
                                    </span>
                                </div>
                            </div>
                        </Layout.Section>
                        <div className="mt-3">
                            <span style={{fontWeight:600}}>Background Color: </span>
                            <img alt="Nothing" style={{paddingRight: "10px"}} src= "chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" />
                            <input type='color' name='background_color' defaultValue={color} className='color' onChange={onChangeColor} />
                        </div>
                    </Layout.Section> 
                    </Layout.Section>
                </Layout>
            </div>
            <div className='mb-3 mt-3'>
                <Layout >
                    <Layout.Section secondary>
                        <TextStyle variation='strong'>Select Date Format</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                        <div className='input-md mb-3'>
                            <Select
                                options={options}
                                onChange={handleSelectChange}
                                value={selected}
                            />
                        </div>
                            { typeof(realtimeSetting.from) === 'number' && selected === 'Random views'  ? (
                            <div className='mb-3'>
                                <div className='mb-3 ml-5'>
                                    <span style={{marginRight: 100, fontWeight:600}}>Min</span>
                                    <input type='number' name='from' defaultValue={formData.from === "" ? formData.from = "0" : realtimeSetting.from} onChange={onChange} className='input-ssm' />
                                </div>
                                <div className='mb-3 ml-5'>
                                    <span style={{marginRight: 100, fontWeight:600}}>Max</span>
                                    <input type='number' name='end' defaultValue={formData === "" ? "0" : realtimeSetting.end} onChange={onChange} className='input-ssm' />
                                </div>
                            </div>
                        ) : ''} 
                    </Layout.Section>
                </Layout>
            </div>
            <div className='mb-3 mt-3'>
                <Layout>
                    <Layout.Section secondary>
                        <TextStyle variation='strong'>Custom Text</TextStyle>      
                    </Layout.Section>
                    <Layout.Section>
                        <input required className="input-form" name='customText' defaultValue={customText} onChange={onChangeText} />
                    </Layout.Section>
                </Layout>
            </div>
            <div className='mb-3 mt-3'>
                <Layout>
                    <Layout.Section secondary>
                        <TextStyle variation='strong'>Color Text</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                        <input defaultValue={colorText} name='colorText' onChange={onChangeColorText} type='color' className='color' />
                    </Layout.Section>
                </Layout>
            </div>
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
            <div style={{marginTop: '60px'}}>
                <Layout>
                    <Layout.Section secondary>
                    </Layout.Section>
                    <Layout.Section>
                        <Button size='large' primary submit={true}>Save</Button>
                        {/* <input type='submit' /> */}
                    </Layout.Section> 
                </Layout>
            </div>
        </form>)}
    </>
    )
}

LayoutPopup.propTypes = {
    addRealtimeSetting: PropTypes.func.isRequired,
    getRealtimeSetting: PropTypes.func.isRequired,
    realtime: PropTypes.object.isRequired
  }

const mapStateToProps = (state) => ({
    realtime: state.realtime
})

export default connect(mapStateToProps, {addRealtimeSetting, getRealtimeSetting})(LayoutPopup)
