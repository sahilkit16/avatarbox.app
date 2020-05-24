class BrowserCache {
  constructor(){
    if(typeof sessionStorage != "undefined"){
      this.session = sessionStorage;
    }
    if(typeof localStorage != "undefined"){
      this.local = localStorage;
    }
  }
}

export default BrowserCache;
