export class MenuItem {
  constructor(
    public name: string,
    public toolTip: string,
    public icon: string = ''
  ) {}
}

export const menuList = [
  new MenuItem('Camadas', 'chemistry class material', 'layers'),
  new MenuItem('Minha Localização', 'biology class material', 'location_on'),
  new MenuItem('Isócrona', 'mathematics class material', 'polyline'),
  new MenuItem('Raio', 'physics class material', 'motion_photos_off'),
];
