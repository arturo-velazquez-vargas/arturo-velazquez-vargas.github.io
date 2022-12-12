import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newProduct = () => {
  const tagsChance = Math.random()
  const categoryChance = Math.random()
  return {
    title: namor.generate({ words: 1, numbers: 0 }),
    ASIN: namor.generate({ words: 1, numbers: 0 }),
    amazonLink:namor.generate({ words: 1, numbers: 0 }),
    supplierLink: namor.generate({ words: 1, numbers: 0 }),
    supplierName: namor.generate({ words: 1, numbers: 0 }),
    currentBBPrice: Math.floor(Math.random() * 100),
    buyCost: Math.floor(Math.random() * 100),
    netProfit: Math.floor(Math.random() * 100),
    ROI: Math.floor(Math.random() * 100),
    margin: Math.floor(Math.random() * 100),
    additionalCost: Math.floor(Math.random() * 100),
    currentBSR: Math.floor(Math.random() * 100),
    latest90DaysPriceAverage: Math.floor(Math.random() * 100),
    latest90DayBSR: Math.floor(Math.random() * 100),
    latest90DaysNumberOfDrops: Math.floor(Math.random() * 100),
    productCategory: categoryChance > 0.66
    ? 'toy'
    : categoryChance > 0.33
    ? 'home'
    : 'office',
    notes: namor.generate({ words: 1, numbers: 0 }),
    tags: tagsChance > 0.66
    ? 'christmas'
    : tagsChance > 0.33
    ? 'halloween'
    : 'birthday',
  }
}

// export default function makeData(...lens) {
//   const makeDataLevel = (depth = 0) => {
//     const len = lens[depth]
//     return range(len).map(d => {
//       return {
//         ...newProduct(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       }
//     })
//   }
export default function makeData() {
  const makeDataLevel = (depth = 0) => {
    return [{
      title: 'Tayga Pesa Rusa Fitness Kettlebell en LB',
      ASIN: 'B085Q2XHQ8',
      amazonLink:'https://www.amazon.com.mx/dp/B085Q2XHQ8',
      supplierLink: 'https://www.walmart.com.mx/deportes/entrenamiento-y-fitness/mancuernas-pesas-y-barras/pesa-rusa-vinyl-tayga-15-lb_00066469705531',
      supplierName: 'Pesa Rusa Vinyl Tayga 15 Lb',
      currentBBPrice: 128.0,
      buyCost: 129.00,
      netProfit: 125.44,
      ROI: 96.5,
      margin: 0,
      additionalCost: 10.0,
      currentBSR: 128.0,
      latest90DaysPriceAverage: 127.0,
      latest90DayBSR: 0,
      latest90DaysNumberOfDrops: 0,
      productCategory: 'Exercise and Physical Conditioning',
      notes: 'Free shipping',
      tags: 'christmas'     
    }
    // ,{
    //   title: namor.generate({ words: 1, numbers: 0 }),
    //   ASIN: namor.generate({ words: 1, numbers: 0 }),
    //   amazonLink:namor.generate({ words: 1, numbers: 0 }),
    //   supplierLink: namor.generate({ words: 1, numbers: 0 }),
    //   supplierName: namor.generate({ words: 1, numbers: 0 }),
    //   currentBBPrice: Math.floor(Math.random() * 100),
    //   buyCost: Math.floor(Math.random() * 100),
    //   netProfit: Math.floor(Math.random() * 100),
    //   ROI: Math.floor(Math.random() * 100),
    //   margin: Math.floor(Math.random() * 100),
    //   additionalCost: Math.floor(Math.random() * 100),
    //   currentBSR: Math.floor(Math.random() * 100),
    //   latest90DaysPriceAverage: Math.floor(Math.random() * 100),
    //   latest90DayBSR: Math.floor(Math.random() * 100),
    //   latest90DaysNumberOfDrops: Math.floor(Math.random() * 100),
    //   productCategory: categoryChance > 0.66
    //   ? 'toy'
    //   : categoryChance > 0.33
    //   ? 'home'
    //   : 'office',
    //   notes: namor.generate({ words: 1, numbers: 0 }),
    //   tags: tagsChance > 0.66
    //   ? 'christmas'
    //   : tagsChance > 0.33
    //   ? 'halloween'
    //   : 'birthday',
    // }
  
  ]
  }
  return makeDataLevel()
}
