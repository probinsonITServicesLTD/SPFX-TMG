import * as React from 'react';
import styles from './TileMenuGenerator.module.scss';
import { ITileMenuGeneratorWebPartProps } from './../TileMenuGeneratorWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';
import { escape } from '@microsoft/sp-lodash-subset';
import Header from './ReactComponents/Header';
import Tile from './ReactComponents/Tile';
import TileContainer from './ReactComponents/TileContainer';
import { SPHttpClient } from '@microsoft/sp-http';


interface ITile{
  name: string;
  order:number;
  properties:string[],
  imageUrl:string;
  tileId:number;
  links:ILink[];
  tileIndex : number
}

interface ILink{
  linkName:string;
  href:string;
  order:number;
  linkid:number;
}



// interface State {
//   tiles: ITile[];
//   display:boolean;
// }

export interface ITileListState{
  Id : string;
  TileData : string;
}


export default class TileMenuGenerator extends React.Component<ITileMenuGeneratorWebPartProps, any> {

  constructor(props){        
    super(props);        
    
    this.state = {
      tiles: [],
      display: false
    }
    //this.onDisplayChange = this.onDisplayChange.bind(this);
    this.onPropertyPaneOpen = this.onPropertyPaneOpen.bind(this);
    this.onPropertyPaneClosed = this.onPropertyPaneClosed.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.getTileInputFieldReference = this.getTileInputFieldReference.bind(this);
    this.onLinkDataChange = this.onLinkDataChange.bind(this);
    this.saveStateToSharePoint = this.saveStateToSharePoint.bind(this);
    this.onAddLink = this.onAddLink.bind(this);

  }  

  componentDidMount(){
    this.readAllItems();
    window.addEventListener('onPropertyPaneOpen', this.onPropertyPaneOpen);
    window.addEventListener('onPropertyPaneClosed', this.onPropertyPaneClosed);
  }

  private readAllItems() : void{
      this.getListItems().then(listItems =>{
        let tileStateDataFromSharePointLIst = JSON.parse(listItems) 
        this.setState((previousState)=>{
          return{
            tiles: tileStateDataFromSharePointLIst.tiles,
            display:previousState.display
          }
        })
      });   
  }

  onAddLink(e){

    console.log("tile index " + e.target.getAttribute('data-tileIndex'));
    let tileIndex = parseInt(e.target.getAttribute('data-tileIndex'));

    //[this.state.tiles[tileIndex].links[linkIndex][dataType]]:newState
    //this.state.tiles.concat("Tile ")

    let newLink = {
      linkName:"New Link",
      href:"",
      order:0,
      linkid: this.state.tiles[tileIndex].links.length + 1,
      linkIndex: this.state.tiles[tileIndex].links.length + 1
    }

    let newTileState = this.state.tiles;
    newTileState[tileIndex].links = newTileState[tileIndex].links.concat(newLink);
    //this.state.tiles[tileIndex].links = this.state.tiles[tileIndex].links.concat(newLink);

    this.setState({
      tiles: newTileState
    },()=>{
      this.saveStateToSharePoint();
    });

  }



  onPropertyPaneOpen(){
    console.log("custom Open fired");
    this.setState((previousState)=>{
      if(this.state.display !== true){
        return{
          tiles: this.state.tiles,
          display:true
       }
      }
    });     
  }

  onPropertyPaneClosed(e){
    console.log("custom close fired by" + JSON.stringify(e, ["message", "arguments", "type", "name"]));
    this.setState((previousState)=>{
      if(this.state.display !==false){
        return{
          tiles: this.state.tiles,
          display:false
       }
      }
    });     
  }


  // private readAllItems() : void{
  //   this.getListItems().then(listItems =>{
  //     let tileStateDataFromSharePointLIst = JSON.parse(listItems) 
  //     console.log("df"+ tileStateDataFromSharePointLIst);
  //     this.setState((previousState)=>{
  //       return{
  //         tiles: tileStateDataFromSharePointLIst,
  //         display:previousState.display
  //       }
  //     })
  //   });
  // }

  private getListItems() : Promise<string>{
    console.log(this.props.context.instanceId);
    const url : string = this.props.context.pageContext.site.absoluteUrl + "/_api/web/lists/getbytitle('a97e9be8-ac14-4f78-b810-1369ab52fced')/items";
    return this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then(response =>{
        console.log(response);
        return response.json();
      })
      .then(json =>{
        console.log("json" + json.value);
        console.log("json" + json.value[0].state);
        return json.value[0].state;
      }) as Promise<string>;
  } 

  protected onAddTile():void{
    //var addTileToArray = this.state.tiles.concat("Tile ")
    // this.setState((previousState)=>{
    //   return{
    //     tiles: addTileToArray,
    //     display:previousState.display
    //   }
    // })
  }

  saveStateToSharePoint(){

    const url : string = this.props.context.pageContext.site.absoluteUrl + "/_api/web/lists/getbytitle('a97e9be8-ac14-4f78-b810-1369ab52fced')/items(1)";
    const tileStateDate = {
      tiles:this.state.tiles
    }
    const body: string = JSON.stringify({  
      'state': JSON.stringify(tileStateDate)
    });  

    this.props.context.spHttpClient.post(url,  
          SPHttpClient.configurations.v1,  
          {  
            headers: {  
              'Accept': 'application/json;odata=nometadata',  
              'Content-type': 'application/json;odata=nometadata',  
              'odata-version': '',  
              'IF-MATCH': '*',  
              'X-HTTP-Method': 'MERGE'  
            },  
            body: body  
    }) 


  }

  onLinkDataChange(e){

    //e.preventDefault();
    // console.log(e.target.value);
    // console.log("type " + e.target.getAttribute('data-type'));
    // console.log("tile id " + e.target.getAttribute('data-tileid'));
    console.log("link index " + e.target.getAttribute('data-linkIndex'));
    console.log("tile index " + e.target.getAttribute('data-tileIndex'));
    let tileId = parseInt(e.target.getAttribute('data-tileid'));
    let fieldType = e.target.getAttribute('data-type');
    let linkId = parseInt(e.target.getAttribute('data-linkid'));

    let linkIndex = parseInt(e.target.getAttribute('data-linkIndex'));
    let tileIndex = parseInt(e.target.getAttribute('data-tileIndex'));


    //this.getTileInputFieldReference(tileId, fieldType, linkId, e.target.value);
    this.getTileInputFieldReference(tileIndex, fieldType, linkIndex, e.target.value);


  }

  protected getTileInputFieldReference(tileIndex:number, dataType:string, linkIndex:number, newState):void{

    let newTileState = this.state.tiles;
    newTileState[tileIndex].links[linkIndex][dataType] = newState;
   

    this.setState({
      tiles: newTileState
    },()=>{
      this.saveStateToSharePoint();
    });

  }

  render(): React.ReactElement<ITileMenuGeneratorWebPartProps> {
    return (
      <div className={ styles.tileMenuGenerator }>
        <Header
          text={this.props.headerText}
          showBorder={this.props.showBorder}
          headerTextSize={this.props.headerTextSize}
          headerPadding={this.props.headerPadding}
          headerMargin={this.props.headerMargin}
          headerColor={this.props.headerColor}
          borderColor={this.props.borderColor}
          borderWidth={this.props.borderWidth}
          alignText={this.props.alignText}
        />
        <TileContainer
          showBorder={this.props.showTMGCBorder}
          borderWidth={this.props.borderTMGCWidth}
          borderColor={this.props.TMGCBorderColor} 
          margin={this.props.TMGCMargin}
          padding={this.props.TMGCPadding}
          tiles={this.state.tiles}
          inEditMode={this.state.display}  
          onLinkDataChange={this.onLinkDataChange}
          disableEdit={this.props.disableEdit}

          //tile props
          tilePadding={this.props.tilePadding}
          tileMargin={this.props.tileMargin}
          tileBorderWidth={this.props.tileBorderWidth}
          tileBorderColor={this.props.tileBorderColor}
          showTileBorder={this.props.showTileBorder}
          onAddLink={this.onAddLink}

          onAddTile={this.onAddTile}
        />
        {
          this.state.display && !this.props.disableEdit?
          <div>
            <span>Open Control Panel</span>
              <button onClick={this.onAddTile}>Add Tile</button>
          </div>
          :
          <div>Closed Control Panel</div>
        
        
        }


      </div>
    );
  }
}
