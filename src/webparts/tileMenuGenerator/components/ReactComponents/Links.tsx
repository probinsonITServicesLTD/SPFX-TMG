import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import Tile from './Tile';
import styles from './../TileMenuGenerator.module.scss';


const Links = (props) =>{

    return(
        <div>
            {console.log("inEditMode " + props.inEditMode + " :::: disableProps :"+props.disableEdit)}
            {props.inEditMode && !props.disableEdit?
                <div className={styles["links-edit-container"]}>
                    <div className={styles["link-input-edit"]}>
                        <div className={styles["link-input-header"]}>Link Text</div>
                        <div className={styles["link-input-header"]}>
                            <input type="text" 
                                data-type="linkName" 
                                data-tileid={props.tileId} 
                                data-linkid={props.linkid}
                                data-linkIndex={props.linkIndex}
                                data-tileIndex={props.tileIndex}
                                defaultValue={props.linkName}
                                onChange={(e) => {props.onLinkDataChange(e)}}
                            />
                        </div>
                    </div>
                    <div className={styles["link-input-edit"]}>
                        <div className={styles["link-input-header"]}>Hyperlink</div>
                        <div className={styles["link-input-header"]}>
                            <input type="text" 
                                data-type="href" 
                                data-tileid={props.tileId} 
                                data-linkid={props.linkid}
                                data-linkIndex={props.linkIndex}
                                data-tileIndex={props.tileIndex}
                                defaultValue={props.href} 
                                onChange={(e) => {props.onLinkDataChange(e)}}
                            />
                        </div>
                    </div>
                    <div className={styles["link-input-edit"]}>
                        <div className={styles["link-input-header"]}>Sort Order</div>
                        <div className={styles["link-input-header"]}>
                            <input type="text" 
                                data-type="sortorder" 
                                data-tileid={props.tileId} 
                                data-linkid={props.linkid}
                                data-linkIndex={props.linkIndex}
                                data-tileIndex={props.tileIndex}
                                defaultValue={props.order} 
                                onChange={(e) => {props.onLinkDataChange(e)}}
                            />
                        </div>
                    </div>
                </div>                  
                :
                <div className={ styles["tile-links"] }>
                    <a href={props.href}>{props.linkName}</a>
                </div>

            }
        </div>
    )     
}

export default Links;