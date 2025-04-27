import { Barn } from "../../components/barn-selector/BarnSelector";

export const ProductService = {
    getProductsData() {
        return [
                {
                  id: '2000',
                  species: 'Dê',
                  herd: 'De068dan12',
                  barn: 'Chuong12D311',
                  entryDate: '12.12.2021',
                  exitDate: '12.06.2022',
                  totalQuantity: 1200120,
                  sickQuantity: 234,
                  cameraMonitoring: 'CAM_008'
                },
                {
                  id: '2001',
                  species: 'Cừu',
                  herd: 'Cuu090dan2',
                  barn: 'Chuong12D311',
                  entryDate: '12.12.2022',
                  exitDate: '12.06.2023',
                  totalQuantity: 6060606,
                  sickQuantity: 12,
                  cameraMonitoring: 'CAM_002'
                },
                {
                  id: '2002',
                  species: 'Cừu',
                  herd: 'De068dan12',
                  barn: 'Chuong12D311',
                  entryDate: '12.12.2022',
                  exitDate: '10.05.2023',
                  totalQuantity: 6060606,
                  sickQuantity: 606,
                  cameraMonitoring: 'PIG_CROSS_LINE_CAM'
                },
                {
                  id: '2003',
                  species: 'Dê',
                  herd: 'De068dan12',
                  barn: 'Chuong12D311',
                  entryDate: '12.12.2021',
                  exitDate: '05.07.2022',
                  totalQuantity: 1200120,
                  sickQuantity: 120,
                  cameraMonitoring: 'SIM_CAM'
                },
                {
                  id: '2004',
                  species: 'Cừu',
                  herd: 'Cuu090dan2',
                  barn: 'Chuong90C12',
                  entryDate: '12.12.2022',
                  exitDate: '15.08.2023',
                  totalQuantity: 6060606,
                  sickQuantity: 6060606,
                  cameraMonitoring: 'CAM_005'
                },
                {
                  id: '2005',
                  species: 'Bò',
                  herd: 'Bo200dan4',
                  barn: 'Chuong20B12',
                  entryDate: '01.01.2023',
                  exitDate: '10.07.2023',
                  totalQuantity: 500500,
                  sickQuantity: 25,
                  cameraMonitoring: 'CAM_006'
                },
                {
                  id: '2006',
                  species: 'Dê',
                  herd: 'De300dan7',
                  barn: 'Chuong30D14',
                  entryDate: '20.03.2023',
                  exitDate: '20.09.2023',
                  totalQuantity: 700700,
                  sickQuantity: 50,
                  cameraMonitoring: "Camera"
                },
                {
                  id: '2007',
                  species: 'Cừu',
                  herd: 'Cuu400dan8',
                  barn: 'Chuong40C16',
                  entryDate: '15.05.2023',
                  exitDate: '30.11.2023',
                  totalQuantity: 800800,
                  sickQuantity: 80,
                  cameraMonitoring: 'Camera'
                },
                {
                  id: '2008',
                  species: 'Bò',
                  herd: 'Bo500dan10',
                  barn: 'Chuong50B20',
                  entryDate: '10.07.2023',
                  exitDate: '15.01.2024',
                  totalQuantity: 900900,
                  sickQuantity: 90,
                  cameraMonitoring: 'Camera'
                },
                {
                  id: '2009',
                  species: 'Dê',
                  herd: 'De600dan12',
                  barn: 'Chuong60D22',
                  entryDate: '01.09.2023',
                  exitDate: '20.03.2024',
                  totalQuantity: 10001000,
                  sickQuantity: 100,
                  cameraMonitoring: 'Camera'
                }
            ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },
};



  export type MonthRange =
    | "Tháng 1-Tháng 3"
    | "Tháng 3-Tháng 5"
    | "Tháng 5-Tháng 7"
    | "Tháng 7-Tháng 9"
    | "Tháng 9-Tháng 11";

  export type BarnId = "all" | "barn1" | "barn2" | "barn3" | "barn4" | "barn5";



  export type WidgetInfo = {
    total: number;
    input: number;
    output: number;
    quantity: number;
  };

  export type MockData = {
    [key in BarnId]: {
      [range in MonthRange]: WidgetInfo;
    };
  };

  export const mockData: MockData = {
    barn1: {
      "Tháng 1-Tháng 3": { total: 1200, input: 800, output: 400, quantity: 33 },
      "Tháng 3-Tháng 5": { total: 1600, input: 1100, output: 500, quantity: 55 },
      "Tháng 5-Tháng 7": { total: 1400, input: 900, output: 500, quantity: 41 },
      "Tháng 7-Tháng 9": { total: 1800, input: 1300, output: 500, quantity: 62 },
      "Tháng 9-Tháng 11": { total: 2000, input: 1500, output: 500, quantity: 74 },
    },
    barn2: {
      "Tháng 1-Tháng 3": { total: 2200, input: 1800, output: 400, quantity: 99 },
      "Tháng 3-Tháng 5": { total: 2600, input: 2100, output: 500, quantity: 112 },
      "Tháng 5-Tháng 7": { total: 3000, input: 2500, output: 500, quantity: 128 },
      "Tháng 7-Tháng 9": { total: 3300, input: 2800, output: 500, quantity: 145 },
      "Tháng 9-Tháng 11": { total: 3600, input: 3100, output: 500, quantity: 161 },
    },
    barn3: {
      "Tháng 1-Tháng 3": { total: 900, input: 600, output: 300, quantity: 25 },
      "Tháng 3-Tháng 5": { total: 1100, input: 800, output: 300, quantity: 30 },
      "Tháng 5-Tháng 7": { total: 1300, input: 1000, output: 300, quantity: 35 },
      "Tháng 7-Tháng 9": { total: 1500, input: 1200, output: 300, quantity: 40 },
      "Tháng 9-Tháng 11": { total: 1700, input: 1400, output: 300, quantity: 45 },
    },
    barn4: {
      "Tháng 1-Tháng 3": { total: 800, input: 500, output: 300, quantity: 20 },
      "Tháng 3-Tháng 5": { total: 1000, input: 700, output: 300, quantity: 27 },
      "Tháng 5-Tháng 7": { total: 1200, input: 900, output: 300, quantity: 33 },
      "Tháng 7-Tháng 9": { total: 1400, input: 1100, output: 300, quantity: 39 },
      "Tháng 9-Tháng 11": { total: 1600, input: 1300, output: 300, quantity: 44 },
    },
    barn5: {
      "Tháng 1-Tháng 3": { total: 1000, input: 700, output: 300, quantity: 28 },
      "Tháng 3-Tháng 5": { total: 1200, input: 900, output: 300, quantity: 34 },
      "Tháng 5-Tháng 7": { total: 1400, input: 1100, output: 300, quantity: 40 },
      "Tháng 7-Tháng 9": { total: 1600, input: 1300, output: 300, quantity: 46 },
      "Tháng 9-Tháng 11": { total: 1800, input: 1500, output: 300, quantity: 52 },
    },
    all: {
      "Tháng 1-Tháng 3": {
        total: 7100,
        input: 5400,
        output: 1700,
        quantity: 205,
      },
      "Tháng 3-Tháng 5": {
        total: 8500,
        input: 6600,
        output: 1900,
        quantity: 258,
      },
      "Tháng 5-Tháng 7": {
        total: 9300,
        input: 7000,
        output: 2300,
        quantity: 307,
      },
      "Tháng 7-Tháng 9": {
        total: 10600,
        input: 7700,
        output: 2900,
        quantity: 332,
      },
      "Tháng 9-Tháng 11": {
        total: 10700,
        input: 8800,
        output: 1900,
        quantity: 376,
      },
    },
  };
  

  export const barns: Barn[] = [
    { _id: "all", name: "Tất cả đàn" },
    { _id: "barn1", name: "Đàn 1" },
    { _id: "barn2", name: "Đàn 2" },
    { _id: "barn3", name: "Đàn 3" },
    { _id: "barn4", name: "Đàn 4" },
    { _id: "barn5", name: "Đàn 5" },
  ];

