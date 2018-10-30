import * as React from 'react';
import styles from './../TileMenuGenerator.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';


const Header = (props) =>{


    return(
        <div className={ styles.header } style={{
                'border-style': props.showBorder?'solid':'none', 
                'font-size':props.headerTextSize, 
                'padding':props.headerPadding, 
                'margin':props.headerMargin,
                'color':props.headerColor,
                'border-color':props.borderColor,
                'border-width':props.borderWidth,
                'text-align':props.alignText
            }}>
           <span>{escape(props.text)}</span>
        </div>
    )     
}

export default Header;