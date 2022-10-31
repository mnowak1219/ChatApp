import { Pipe, PipeTransform } from '@angular/core';
import { DisplayUserDto } from '../shared/models/display-user-dto';

@Pipe({
  name: 'sorted',
  pure: true
})
export class SortedPipe implements PipeTransform {

  transform(value: Array<DisplayUserDto>, args?: any): Array<DisplayUserDto> {
    var index = 0;
    return value.sort((a, b) => {

      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      }

      else if (a.firstName.toLowerCase() == b.firstName.toLowerCase()) {
        if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
          return 1;
        }
        else {
          return -1;
        }
      }
      else if (a.lastName.toLowerCase() == b.lastName.toLowerCase()) {
        if (a.email.toLowerCase() > b.email.toLowerCase()) {
          return 1;
        }
        else {
          return -1;
        }
      }
      else {
        return -1;
      }
    });
  }
}
