
export interface ITileMenuGeneratorProps {
  description: string;

  //header properties


  headerText: string;
  showBorder: boolean;
  headerTextSize : number;
  headerPadding : number;
  headerMargin: number;
  headerColor: string;
  showSetHeaderTextColorControl: boolean;
  setHeaderTextColor:boolean;
  setBorderTextColor:boolean;
  borderColor:string;
  borderWidth:number;
  alignText: string;

  


  //tileContainer properties
  showTMGCBorder: boolean;
  borderTMGCWidth: number;
  setTMGCBorderColor: boolean;
  TMGCBorderColor: string;
  TMGCMargin: number;
  TMGCPadding: number;


  //Tiles Properties
  tilePadding: number;
  tileMargin: number;
  tileBorderWidth: number;
  tileBorderColor: string;
  showTileBorder: boolean;

  inEditMode:boolean;


  
}
