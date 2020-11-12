import React, { useEffect } from 'react'
import NotificationSetting from '../Notification Settings/NotificationSetting';
import Alert from '../Alert'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getNotification} from '../../actions/notification'
import Spinner from './Spinner'
const NotificationSettings = ({getNotification, notification: {notification, loading}}) => { 
    useEffect(() => {
        getNotification();
    }, [getNotification]);

    return (
        <>
            {loading && notification === null ? ( <Spinner /> ) : (
                <div className='container'>
                    <Alert />
                    {notification.map((item, index) => (
                        <NotificationSetting notification={item} key={index}/>
                    ))}

                </div>
            )}
        </>
    )
}

NotificationSettings.propTypes = {
    getNotification: PropTypes.func.isRequired,
    notification: PropTypes.object.isRequired,
  }

const mapStateToProps = (state) => ({
    notification: state.notification
})


export default connect(mapStateToProps, {getNotification})(NotificationSettings)
