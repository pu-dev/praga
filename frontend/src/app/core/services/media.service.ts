// import { Injectable }   from '@angular/core';
// import { MediaMatcher } from '@angular/cdk/layout';
// import { MatSnackBar }  from '@angular/material/snack-bar';


// @Injectable({
//   providedIn: 'root'
// })
// export class MediaService {
//   private _isMaxWidth360: MediaQueryList;
//   private _isMaxWidth420: MediaQueryList;
//   private _isMaxWidth480: MediaQueryList;

//   constructor(
//     media: MediaMatcher,
//   ) {
//      this._isMaxWidth360 = media.matchMedia('(max-width: 360px)');
//      this._isMaxWidth420 = media.matchMedia('(max-width: 420px)');
//      this._isMaxWidth480 = media.matchMedia('(max-width: 480px)');
//   }

//   isMaxWidth360() {
//     if (this._isMaxWidth360 == undefined) {
//       return false;
//     }

//     return this._isMaxWidth360.matches;
//   }
  
//   isMaxWidth420() {
//     if (this._isMaxWidth420 == undefined) {
//       return false;
//     }

//     return this._isMaxWidth420.matches;
//   }


//   isMaxWidth480() {
//     if (this._isMaxWidth480 == undefined) {
//       return false;
//     }

//     return this._isMaxWidth480.matches;
//   }

//   isMobile() {
//     return this.isMaxWidth360() || this.isMaxWidth420() || this.isMaxWidth480();
//   }

// }
