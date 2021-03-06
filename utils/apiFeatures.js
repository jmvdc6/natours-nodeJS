class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // 1A) FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    // 4) PAGINATION
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

//OLD VERSION

// // BUILD QUERY
// // 1A) FILTERING
// const queryObj = { ...req.query };
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
// excludedFields.forEach((el) => {
//   delete queryObj[el];
// });

// // CHAINING FILTERS

// // const tours = await Tour.find()
// //   .where('duration')
// //   .equals(5)
// //   .where('difficulty')
// //   .equals('easy');

// // 1B) ADVANCED FILTERING

// // { difficulty: 'easy', duration: {$gte: 5}}
// // { difficulty: 'easy', duration: {gte: '5'}}
// // gte, gt, lte, lt
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

// // console.log(JSON.parse(queryStr));

// let query = Tour.find(JSON.parse(queryStr));

// // 2) SORTING
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   // console.log(sortBy)
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
// }

// // 3) FIELD LIMITING
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }

// // 4) PAGINATION
// const page = +req.query.page || 1;
// const limit = +req.query.limit || 100;
// const skip = (page - 1) * limit;

// query = query.skip(skip).limit(limit);

// if (req.query.page) {
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error('This page does not exist');
// }
