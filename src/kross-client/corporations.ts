import { KrossClientBase } from './base';
import { useMutation } from 'react-query';
import {
  getCorporationDto,
  updateCorporationDto,
} from '../types/kross-client/corporations';
export class Corporation extends KrossClientBase {
  getCorporation(getCorporationDto: getCorporationDto) {
    return this.instance.get<getCorporationDto>(
      '/corporations',
      getCorporationDto
    );
  }
  updateCorporation(updateCorporationDto: updateCorporationDto) {
    return this.instance.put<updateCorporationDto>(
      `/corporations/${updateCorporationDto.params.corporationId}`,
      updateCorporationDto
    );
  }

  useCorporationHook() {
    return {
      getCorporation: () => {
        const mutation = useMutation((getCorporationDto: getCorporationDto) =>
          this.getCorporation(getCorporationDto)
        );
        return mutation;
      },
      updateCorporation: () => {
        const mutation = useMutation(
          (updateCorporationDto: updateCorporationDto) =>
            this.updateCorporation(updateCorporationDto)
        );
        return mutation;
      },
    };
  }
}
