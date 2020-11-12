import React from 'react'
import {Button, ButtonGroup} from '@shopify/polaris';

const Navbar = () => {
    return (
        <div>
            <ButtonGroup>
                <Button url="#">FAQs</Button>
                <Button external url="https://live-sale-notifications.myshopify.com/pages/document">Document</Button>
            </ButtonGroup>
        </div>
    )
}

export default Navbar
