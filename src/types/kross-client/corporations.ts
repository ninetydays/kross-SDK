export type getCorporationDto = {
  params: { query: { user_id: string }; fields: string };
};
export type updateCorporationDto = {
  corpId: number;
  state: string;
};
