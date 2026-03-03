import type { Product, ProductCategory } from '../products/ProductTypes.js';
import { v4 as uuid} from 'uuid'
const id = uuid()


export const categories: ProductCategory[] = [
    {
        id,
        name: 'Electrónica',
        slug: 'electronica',
    },
    {
        id,
        name: 'Periféricos',
        slug: 'perifericos',
        parentSlug: 'electronica',
    },
    {
        id,
        name: 'Audio',
        slug: 'audio',
        parentSlug: 'electronica',
    },
    {
        id,
        name: 'Gaming',
        slug: 'gaming',
        parentSlug: 'electronica',
    },
];

export const products: Product[] = [
    {
        id,
        sku: 'MOUSE-LOGI-G502-BLK',
        name: 'Ratón gaming Logitech G502',
        slug: 'raton-gaming-logitech-g502',
        shortDescription:
            'Ratón gaming ergonómico con 11 botones programables.',
        longDescription:
            'Ratón gaming Logitech G502 HERO con sensor de alta precisión, 11 botones programables, peso ajustable y retroiluminación RGB.',
        brand: 'Logitech',
        mainCategory: 'gaming',
        otherCategory: ['perifericos', 'electronica'],
        price: 69.99,
        vatType: 21,
        inStock: true,
        stock: 120,
        status: 'published',
        images: [
            {
                url: 'https://i.pinimg.com/736x/17/fe/7a/17fe7a287650338935def8e91c51d570.jpg',
                alt: 'Ratón gaming Logitech G502 vista superior',
                isMain: true,
            },
            {
                url: 'https://i.pinimg.com/1200x/44/e5/15/44e5159e5b907a87cf9103a40347e46c.jpg',
                alt: 'Ratón gaming Logitech G502 vista lateral',
                isMain: false,
            },
        ],
        variants: [
            {
                id,
                sku: 'MOUSE-LOGI-G502-BLK',
                attributes: { color: 'negro', handed: 'derecha' },
                price: 69.99,
                stock: 80,
            },
            {
                id,
                sku: 'MOUSE-LOGI-G502-WHT',
                attributes: { color: 'blanco', handed: 'derecha' },
                price: 72.99,
                stock: 40,
            },
        ],
        attributes: {
            dpiMax: 25600,
            cable: false,
            rgb: true,
            pesoAjustable: true,
        },
    },
    {
        id,
        sku: 'KEYB-MECH-RGB-TKL',
        name: 'Teclado mecánico TKL RGB',
        slug: 'teclado-mecanico-tkl-rgb',
        shortDescription:
            'Teclado mecánico TKL con switches rojos y retroiluminación RGB.',
        longDescription:
            'Teclado mecánico tenkeyless con switches lineales rojos, estructura de aluminio, keycaps PBT y retroiluminación RGB direccionable.',
        brand: 'RedDragon',
        mainCategory: 'perifericos',
        otherCategory: ['gaming'],
        price: 89.9,
        vatType: 21,
        inStock: true,
        stock: 60,
        status: 'published',
        images: [
            {
                url: 'https://i.pinimg.com/1200x/69/fb/e1/69fbe186cfd816591247bada05689b19.jpg',
                alt: 'Teclado mecánico TKL RGB iluminado',
                isMain: true,
            },
        ],
        variants: [
            {
                id,
                sku: 'KEYB-MECH-RGB-TKL-RED',
                attributes: { switch: 'red', layout: 'ES' },
                price: 89.9,
                stock: 40,
            },
            {
                id,
                sku: 'KEYB-MECH-RGB-TKL-BROWN',
                attributes: { switch: 'brown', layout: 'ES' },
                price: 94.9,
                stock: 20,
            },
        ],
        attributes: {
            wireless: false,
            keycapsMaterial: 'PBT',
            layout: 'TKL',
            incluyeReposamuñecas: false,
        },
    },
    {
        id,
        sku: 'HEADPH-BT-ANC-BLK',
        name: 'Auriculares Bluetooth con ANC',
        slug: 'auriculares-bluetooth-anc',
        shortDescription:
            'Auriculares over-ear Bluetooth con cancelación de ruido activa.',
        longDescription:
            'Auriculares inalámbricos over-ear con cancelación de ruido activa (ANC), hasta 30 horas de batería y carga rápida USB-C.',
        brand: 'Sony',
        mainCategory: 'audio',
        otherCategory: ['electronica'],
        price: 199.0,
        vatType: 21,
        inStock: true,
        stock: 35,
        status: 'published',
        images: [
            {
                url: 'https://i.pinimg.com/474x/b3/4b/06/b34b06b387e80dc28ac11d6145e82472.jpg',
                alt: 'Auriculares Bluetooth con ANC color negro',
                isMain: true,
            },
        ],
        attributes: {
            wireless: true,
            bluetoothVersion: '5.3',
            anc: true,
            incluyeEstuche: true,
        },
    },
    {
        id,
        sku: 'MONITOR-27-144HZ-IPS',
        name: 'Monitor 27" 144Hz IPS',
        slug: 'monitor-27-144hz-ips',
        shortDescription: 'Monitor gaming 27 pulgadas, 144Hz, panel IPS.',
        longDescription:
            'Monitor de 27" con resolución 2560x1440, tasa de refresco 144Hz, panel IPS, compatible con FreeSync y G-Sync.',
        brand: 'AOC',
        mainCategory: 'electronica',
        otherCategory: ['gaming'],
        price: 299.99,
        vatType: 21,
        inStock: true,
        stock: 18,
        status: 'published',
        images: [
            {
                url: 'https://i.pinimg.com/1200x/3a/cb/9a/3acb9a5fe842ed9b6eba2ccd4e6961e2.jpg',
                alt: 'Monitor gaming 27 pulgadas 144Hz',
                isMain: true,
            },
        ],
        attributes: {
            sizeInches: 27,
            resolution: '2560x1440',
            refreshRateHz: 144,
            panelType: 'IPS',
            curved: false,
        },
    },
    {
        id,
        sku: 'MOUSEPAD-XL-RGB',
        name: 'Alfombrilla gaming XL RGB',
        slug: 'alfombrilla-gaming-xl-rgb',
        shortDescription: 'Alfombrilla XXL con iluminación RGB perimetral.',
        longDescription:
            'Alfombrilla de ratón tamaño XXL con superficie de tejido microtexturizado, base de goma antideslizante e iluminación RGB perimetral con múltiples efectos.',
        brand: 'Razer',
        mainCategory: 'gaming',
        otherCategory: ['perifericos'],
        price: 39.99,
        vatType: 21,
        inStock: false,
        stock: 0,
        status: 'discontinued',
        images: [
            {
                url: 'https://i.pinimg.com/1200x/5f/82/fd/5f82fd1d9a285976158f1025a62cc9f1.jpg',
                alt: 'Alfombrilla gaming XL RGB encendida',
                isMain: true,
            },
        ],
        attributes: {
            lengthCm: 90,
            widthCm: 40,
            thicknessMm: 4,
            rgb: true,
            washable: true,
        },
    },
];
