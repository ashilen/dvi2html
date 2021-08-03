import { Buffer } from 'buffer';
import { Tfm } from './tfm/tfm';
import { loadFont } from './tfm/index';

export interface Rule {
  a : number;
  b : number;
}

class Position {
  h: number = 0;
  v: number = 0;
  w: number = 0;
  x: number = 0;
  y: number = 0;
  z: number = 0;
  
  constructor(properties? : Position) {
    if (properties) {
      this.h = properties.h;
      this.v = properties.v;
      this.w = properties.w;
      this.x = properties.x;
      this.y = properties.y;
      this.z = properties.z;
    } else {
      this.h = this.v = this.w = this.x = this.y = this.z = 0;      
    }
  }
}

export class DviFont {
  name !: string;
  checksum: number = 0;
  scaleFactor: number = 0;
  designSize: number = 0;
  metrics !: Tfm;
  
  constructor(properties : DviFont) {
    this.name = properties.name;
    this.checksum = properties.checksum;
    this.scaleFactor = properties.scaleFactor;
    this.designSize = properties.designSize;
  }
}

export class Machine {
  fonts : DviFont[] = [];
  font !: DviFont;
  stack : Position[] = [];
  position : Position = new Position();
  title : string = '';

  savedPosition : Position = new Position(); // for the ximera:save and ximera:restore specials
  
  constructor () {
    // this.fonts = [];
  }
  
  preamble ( numerator : number, denominator : number, magnification : number, comment : string ) {
  }

  pushColor( c : string ) {
  }

  popColor( ) {
  }

  setXimeraRule( r : string ) {
  }

  setXimeraRuleOpen( r : string ) {
  }

  setXimeraRuleClose( ) {
  }    
  
  pushXimera( e : string ) {
  }

  popXimera( ) {
  }    

  setPapersize( width : number, height : number ) {
  }
    
  push() {
    this.stack.push(new Position(this.position));
  }

  pop() {
    const result = this.stack.pop();
    
    if (result) 
      this.position = result;
    else
      throw new Error('Popped from empty position stack');
  }

  beginPage( page : any ) {
    this.stack = [];
    this.position = new Position();
  }

  endPage() { }  

  post( p : any ) { }
  
  postPost( p : any ) { }
  
  putRule( rule : Rule ) {
  }

  moveRight( distance : number ) {
    this.position.h += distance;
  }

  moveDown( distance : number ) {
    this.position.v += distance;
  }

  setFont( font : DviFont ) {
    this.font = font;
  }

  beginSVG( ) {
  }

  endSVG( ) {
  }  
  
  putSVG( svg : string ) {
  }

  putHTML( html : string ) {
  }

  setTitle( title : string ) {
    this.title = title;
  }  
  
  // Returns the width of the text
  putText( text : Buffer ) : number {
    return 0;
  }  

  loadFont( properties : any ) : DviFont {
    var f = new DviFont(properties);
    f.metrics = loadFont(properties.name);
    return f;
  }
}

