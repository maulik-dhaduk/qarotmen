const Product_model = require("../model/Product_Model")
const add_product = async (req, res) => {
  res.send("data added")
}

const default_product = async (req, res) => {

  const data = await Product_model.find({});

  if (data.length == 0) {
    await Product_model.insertMany([
      {
        name: "French Knot Embroidered Tuxedo Blazer",
        sku:"B169DBk-1",
        price: 23999,
        category:"Ethnicwear",
        images: ["dsc03712-110854880961262_l.jpg", "dsc03711-110850665370824_l.jpg","dsc03690-110852719619927_l.jpg","dsc03707-110856908700226_l.jpg"],
        description: "- Our model wears size 'M' and he is 182 cms i.e 6 feet tall. - Hand embroidery done on zed black japanese lachka fabric . - Single button tuxedo pattern. - Satin lining inside out. - Tailored fit. - Add shirt and pants separately. - Contact support for customization. - This is a make on order item , hence return/exchange is not available in this product."
      },
      {
        name: "White Sequin Open Bandhgala Jacket",
        sku:"B170DBk-1",
        price: 12999,
        category:"Ethnicwear",
        images: ["dsc04026-110347505261829_l.jpg", "dsc04031-110345474807521_l.jpg","dsc04038-110349451712395_l.jpg","dsc04037-110351526629124_l.jpg"],
        description: "- Our model wears size 'M' and he is 182 cms i.e 6 feet tall. - White sequin embroidery done on zed black velvet base. - Short length pen style bandhgala jacket. - Tailored fit. - Add shirt and pants separately. - Contact support for customization. - This is a make on order item, hence return/exchange is not available on this product."
      },
      {
        name: "Cotton Embroidered Shacket In Yellow",
        sku:"B167Yo-1",
        price: 6999,
        category:"Ethnicwear",
        images: ["dsc04155-10082063923754_l.jpg", "dsc04161-10083905915719_l.jpg","dsc04157-10085660781153_l.jpg","dsc04159-10087300064861_l.jpg"],
        description: "- Our model wears size 'M' and he is 182 cms i.e 6 feet tall. - 100% cotton fabric with jute embroidery. - Satin lining inside out. - American lapel three button style shacket. - Half sleeve straight fit cut. - Add pants separately. - Contact support for customization. - This is a made to order product hence return/exchange is not available."
      },
      {
        name: "Tericott Achkan In Pink",
        sku:"B163Pk-1",
        price: 7999,
        category:"Ethnicwear",
        images: ["4d3a9651-98290414715166_l.jpg", "4d3a9661-98286139145599_l.jpg","4d3a9658-98288322863971_l.jpg","4d3a9669-98292723135415_l.jpg"],
        description: "- Our model wears size 'M' and he is 182 cms i.e 6 feet tall. - Premium japanese lachka fabric with a super smooth fall. - Button up long length bandhgala style with a V neck cut. - Tailored fit. - Satin lining inside out. - Contact support for customization. - Add shirt and pants separately."
      },
      {
        name: "Ombre Kurta With Dupatta In Lavender",
        sku:"K137Pu-1",
        price: 2999,
        category:"Festive 2026",
        images: ["4d3a9781-266678988319702_l.jpg", "4d3a9779-266671495319100_l.jpg","4d3a9789-263672280390211_l.jpg","4d3a9780-266673039336606_l.jpg"],
        description: "- Our model wears size 'M' and he is182 cms i.e 6 feet tall. - 100% cotton shaded fabric in white and lavender blend. - Original mirror work on collar and neck. - 2.5 mtr shaded dupatta with sequence mirror lace on bottom ends. - Straight cut relax fit. - Add pants separately. - This price includes only kurta with dupatta."
      },
      {
        name: "Ombre Kurta With Dupatta In Yellow",
        sku:"K138Yo",
        price: 2999,
        category:"Festive 2026",
        images: ["4d3a9809-266581634738657_l.jpg", "4d3a9825-266573054077824_l.jpg","4d3a9806-266574771859261_l.jpg","4d3a9821-266576405952396_l.jpg"],
        description: "- Our model wears size 'M' and he is182 cms i.e 6 feet tall. - 100% cotton shaded fabric in white and yellow blend. - Original mirror work on collar and neck. - 2.5 mtr shaded dupatta with sequence mirror lace on bottom ends. - Straight cut relax fit. - Add pants separately. - This price includes only kurta with dupatta."
      },
      {
        name: "Sequence Kurta with Dupatta In Brown",
        sku:"K139Br",
        price: 3249,
        category:"Festive 2026",
        images: ["4d3a9918-266480018364608_l.jpg", "4d3a9916-266473482983408_l.jpg","4d3a9926-266475253727889_l.jpg","4d3a9919-266477090615015_l.jpg"],
        description: "- Our model wears size 'M' and he is182 cms i.e 6 feet tall. - Viscose silk blended fabric with black sequence work on front, sleeves, neck and solid plain back. - Cotton lining inside out. - 2.5 mtr dupatta with same sequence border lace. - Straight cut relax fit. - Add pants separately. - This price includes only kurta with dupatta."
      },
      {
        name: "Embroidered Kurta with Dupatta In Powder Blue",
        sku:"K145Bl-1",
        price: 3899,
        category:"Festive 2026",
        images: ["4d3a9842-359801622893938_l.jpg", "4d3a9834-359789900646520_l.jpg","4d3a9837-359791809817781_l.jpg","4d3a9832-359793963521143_l.jpg"],
        description: "- Our model wears size 'M' and he is 182 cms i.e 6 feet tall. - Viscose silk blended fabric with thread embroidery on front and sleeves. - Cotton lining inside out. - Straight cut relax fit. - 2.5 mtr embroidered laced dupatta. - Add pants separately. - This price includes only kurta with dupatta."
      },
      {
        name: "Striped Tailored Blazer In Grey",
        sku:"B142Gr-1",
        price: 3499,
        category:"SUMMER 2026",
        images: ["dsc00235-16716774738142_l.jpg", "dsc00242-16705222858776_l.jpg","dsc00238-16710819878491_l.jpg","dsc00238-16710819878491_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms i.e 5'11 tall. - Teriwool blended fabric with vertical stripes on grey base. - Double breasted six button style. - Tailored fit. - Add pants separately. - Contact support for customization."
      },
      {
        name: "Striped Double Breasted Blazer",
        sku:"B141WiGn-1",
        price: 3799,
        category:"SUMMER 2026",
        images: ["dsc00218-16292998276363_l.jpg", "dsc00215-16297998341524_l.jpg","dsc00214-16302924252357_l.jpg","dsc00223-16308071158441_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms i.e 5'11 tall. - Teriwool blended fabric with vertical stripes on white base. - Double breasted six button style with american white lapel. - Tailored fit. - Add pants separately. - Contact support for customization."
      },
      {
        name: "Color Striped Blazer In Brown",
        sku:"B140BrBl-1",
        price: 3499,
        category:"SUMMER 2026",
        images: ["dsc00180-16032777290479_l.jpg", "dsc00178-16037393304654_l.jpg","dsc00176-16042102323505_l.jpg","dsc00188-16047681557091_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms i.e 5'11 tall. - Teriwool blended fabric with vertical stripes on brown base. - Tuxedo style with american lapel. - Tailored fit. - Add pants separately. - Contact support for customization."
      },
      {
        name: "Striped Tailored Fit Blazer In White",
        sku:"B139WiBk-1",
        price: 3799,
        category:"SUMMER 2026",
        images: ["dsc00164-15703006318529_l.jpg", "dsc00163-15697828310585_l.jpg","dsc00166-15708233596150_l.jpg","dsc00167-15713910119651_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms i.e 5'11 tall. - Teriwool blended fabric with vertical stripes on white base. - Double breasted six button style with black velvet round lapel. - Tailored fit. - Add pants separately. - Contact support for customization."
      },
      {
        name: "Japanese Bootcut Fit Gurkha Pants In Wine",
        sku:"P292Wn-1",
        price: 2999,
        category:"Pants",
        images: ["dsc03961-342510254988522_l.jpg", "dsc03969-342498395423290_l.jpg","dsc03963-342500073450899_l.jpg","dsc03965-342501930198616_l.jpg"],
        description: "- Our model wears size '32' and he is 182 cms i.e 6 feet tall. - Super flowing premium japanese lachka fabric . - Buckle up high waist fit. - Bootcut/bell bottom style. - Contact support for customization."
      },
      {
        name: "Japanese Bootcut Fit Gurkha Pants In Beige",
        sku:"P288Ce-1",
        price: 2999,
        category:"Pants",
        images: ["dsc04167-860880674271_l.jpg", "dsc04176-859378121377_l.jpg","dsc04174-862543486905_l.jpg","dsc04170-863977312673_l.jpg"],
        description: "- Our model wears size '32' and he is 182 cms i.e 6 feet tall. - Super flowing premium japanese lachka fabric . - Buckle up high waist fit. - Bootcut/bell bottom style. - Contact support for customization."
      },
      {
        name: "Japanese Bootcut Fit Gurkha Pants In Off Green",
        sku:"P287Gn-1",
        price: 2999,
        category:"Pants",
        images: ["dsc04208-321102972148_l.jpg", "dsc04212-319710407880_l.jpg","dsc04209-322656524541_l.jpg","dsc04213-324261293236_l.jpg"],
        description: "- Our model wears size '32' and he is 182 cms i.e 6 feet tall. - Super flowing premium japanese lachka fabric . - Buckle up high waist fit. - Bootcut/bell bottom style. - Contact support for customization."
      },
      {
        name: "Teriwool Korean Pants In Tan",
        sku:"P285Br-1",
        price: 2499,
        category:"Pants",
        images: ["dsc00305-1-945170039666_l.jpg", "dsc00306-940403261034_l.jpg","dsc00302-950405932152_l.jpg","dsc00301-955140324654_l.jpg"],
        description: "- Our model wears size '32' and he is 180cms i.e 5'11 tall. - Teri wool blended thick textured fabric. - Wide leg pleated korean fit. - Trouser belt and buckles to adjust the waist. - Kinda baggy fit."
      },
      {
        name: "Malai linen Shorts In White",
        sku:"P4135Br-1",
        price: 999,
        category:"Shorts",
        images: ["dsc1552-68862971671565_l.jpg", "dsc1553-68846381680574_l.jpg","dsc1550-68952459799945_l.jpg","dsc1551-68968338226869_l.jpg"],
        description: "- Our model wears size '32' and he is 180cms i.e 5'11 tall. - Malai linen cotton blended fabric. - Belt style with two front pockets and folded bottoms. - Relax Fit. - Summer shorts."
      },
      {
        name: "Striped Cotton Shorts",
        sku:"R022Wi-1",
        price: 1399,
        category:"Shorts",
        images: ["dsc07028-437356_l.jpg", "dsc07036-493291_l.jpg","dsc07038-954082_l.jpg","dsc07039-607390_l.jpg"],
        description: "- Our model wears size '32' and he is 180cms i.e 5'11 tall. - 100% cotton fabric with linen textured stripes all over. - Front and back pockets. - Summer comfort. - Add coord shirt separately."
      },
      {
        name: "Men's Polka Dot Boxers",
        sku:"R016PWi-1",
        price: 399,
        category:"Shorts",
        images: ["184a0612-122032_l.jpg", "184a0613-482368_l.jpg","184a0614-253593_l.jpg","184a0616-255312_l.jpg"],
        description: "- Our model wears size '32' and he is 180cms i.e 5'11 tall. - Green polka dots on white cotton fabric. - Elastic belt and a back pocket. - Night wear. - Coord shirt available."
      },
      {
        name: "Men's Multicolor Striped Coords",
        sku:"SH044PMu-1",
        price: 999,
        category:"Shorts",
        images: ["img6481-714639_l.jpg", "img6484-424039_l.jpg","img6487-487361_l.jpg","img6486-455086_l.jpg"],
        description: "- Our model wears size 'M' and he is 183cms i.e 6 feet tall. - These coords comes with a shirt and boxers. - Summer poolwear and nightwear. - Washable. - Steam iron only in low heat."
      },
      {
        name: "Textured Striped Tshirt In Pink",
        sku:"T061Pk-1",
        price: 999,
        category:"Loungewear",
        images: ["dsc00468-116951703191_l.jpg", "dsc00465-112352458378_l.jpg","dsc00471-121788903420_l.jpg","dsc00464-126410784915_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms ie 5'11 tall. - Cotton-viscose blended fabric. - Knitted stripe textured fabric in pink color. - Round collar , half sleeve cut. - Relax fit. - Loungewear."
      },
      {
        name: "Textured Striped Tshirt In Brown",
        sku:"T058Br-1",
        price: 999,
        category:"Loungewear",
        images: ["dsc00435-96912092549385_l.jpg", "dsc00431-96899211841578_l.jpg","dsc00436-96903359457118_l.jpg","dsc00434-96907600574275_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms ie 5'11 tall. - Cotton-viscose blended fabric. - Knitted stripe textured fabric in tan brown color. - Round collar , half sleeve cut. - Relax fit. - Loungewear."
      },
      {
        name: "Black Knit Crochet Baggy Shirt",
        sku:"SH224Bk-1",
        price: 1699,
        category:"Loungewear",
        images: ["dsc00829-5377065944791_l.jpg", "dsc00849-5303745149078_l.jpg","dsc00828-5308464478200_l.jpg","dsc00839-5295501245637_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms i.e 5'11 tall. - Knitted hosiery textured fabric with a smooth touch and good fall. - Half sleeve baggy fit. - Summer comfort. - Add pants separately."
      },
      {
        name: "Oversized Rustic Tank",
        sku:"T054Br-1",
        price: 1299,
        category:"Loungewear",
        images: ["dsc01123-3270348143087_l.jpg", "dsc01126-3087627364916_l.jpg","dsc01135-3134309625826_l.jpg","dsc01137-3186072535037_l.jpg"],
        description: "- Our model wears size 'M' and he is 180cms i.e 5'11 tall. - Knitted fabric with black spendix thread for a super stretch. - Round neck Baggy fit. - Square bottom cut. - Add pants separately. - Street and loungewear."
      }
    ]);
  }
}

const show_product = async (req, res) => {
  const data = await Product_model.find({})
  res.json(data)
}

const Find_Prouct_data = async (req, res) => {
  const data = await Product_model.findById(req.query.id)
  if (!data) return res.status(400).json({ message: "Product not found" });
  res.json(data)
}

const search = async (req, res) => {
    
    const { query } = req.query
    let filter = {}
    
    if (query) {
        filter = {
            $or: [
                { name: { $regex: `\\b${query}\\b`, $options: "i" } }
            ]
        }
    }
    const product = await Product_model.find(filter)
    res.json(product)
}

module.exports = { default_product, add_product, show_product, Find_Prouct_data, search }