const Contact = require("../models/contact");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (e) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json(contact);
  } catch (e) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (e) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Contact with id ${contactId} not found` });
  }
  if (!req.body) {
    return res.status(400).json({ message: "Missing required field" });
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedContact);
  } catch (e) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json({
      message: "Contact deleted",
      deletedContact,
    });
  } catch (e) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        favorite: req.body.favorite,
      },
      {
        new: true,
      }
    );
    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Not found" });
  }
};
module.exports = {
  getAllContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
  updateStatusContact,
};
