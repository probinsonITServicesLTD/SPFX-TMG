import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import Tile from './Tile';



const TileContainer = (props) =>{

    return(
        <div style={{
                'border-style': props.showBorder?'solid':'none', 
                'font-size':props.headerTextSize, 
                'padding':props.padding, 
                'margin':props.margin,
                'color':props.headerColor,
                'border-color':props.borderColor,
                'border-width':props.borderWidth,
                'text-align':props.alignText
            }}>
            <div style={{'display':'flex', 'flex-direction':'row', 'flex-wrap':'wrap'}}>
                {
                    props.tiles.map((tile, i)=> 
                    <Tile 
                        title={tile.name}    
                        imageUrl={tile.imageUrl}
                        showBorder={props.showTileBorder}
                        borderWidth={props.tileBorderWidth}
                        borderColor={props.tileBorderColor} 
                        margin={props.tileMargin}
                        padding={props.tilePadding}
                        inEditMode={props.inEditMode}      
                        links={tile.links}
                        tileId={tile.tileId}
                        onLinkDataChange={props.onLinkDataChange}
                        disableEdit={props.disableEdit}
                        tileIndex={i}
                        onAddLink={props.onAddLink}
                    ></Tile>)
                }     
                                
            </div>
        </div>
    )     
}

export default TileContainer;