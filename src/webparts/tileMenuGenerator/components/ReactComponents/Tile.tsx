import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './../TileMenuGenerator.module.scss';
import Links from './Links';


const Tile = (props) =>{
    return(
        <div style={{
                'border-style': props.showBorder?'solid':'none', 
                'padding':props.padding, 
                'margin':props.margin,
                'border-color':props.borderColor,
                'border-width':props.borderWidth,
                'text-align':props.alignText
            }}>
            <img src={props.imageUrl} height="100"/>
            <div className="tiles">
                {
                    props.inEditMode && !props.disableEdit?
                    <div>
                        <div>
                            <span style={{'font-weight':'bold'}}>Tile Name: </span>
                            <span>{props.title}</span>
                        </div>
                        <div>
                            <button data-tileIndex={props.tileIndex} onClick={props.onAddLink}>Add Link</button>
                        </div>
                    </div>
                    :
                    ""
                }
                {
                    props.links.map((link, i)=> 
                        <Links
                            inEditMode={props.inEditMode}  
                            linkName={link.linkName}
                            href={link.href}
                            order={link.order}
                            tileId={props.tileId}
                            onLinkDataChange={props.onLinkDataChange}
                            linkid={link.linkid}
                            disableEdit={props.disableEdit}
                            linkIndex={i}
                            tileIndex={props.tileIndex}
                        />
                    )
                       
                }
                
            </div>               
        </div>
    )     
}

export default Tile;