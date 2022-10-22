module.exports = (mongoose:any) => {
  const schema:any = mongoose.Schema(
    {
      address: String,
      city: String,
      stateOrProvince: String,
      zipOrPostalCode: String,
      empolyee: String,
      locationUrl: String,
      status: String
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Offices:any = mongoose.model("Offices", schema);
  return Offices;
};
