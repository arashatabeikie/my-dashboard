const prisma = require('../lib/prisma');

// GET all partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: partners
    });
  } catch (error) {
    console.error('Get partners error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve partners' 
    });
  }
};

// POST create new partner
exports.createPartner = async (req, res) => {
  try {
    const { name, company, email, country, commissionRate, userId } = req.body;

    if (!name || !company || !email || !country || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, company, email, country, and userId are required' 
      });
    }

    const existing = await prisma.partner.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }

    const partner = await prisma.partner.create({
      data: {
        name,
        company,
        email,
        country,
        commissionRate: parseFloat(commissionRate) || 0,
        userId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Partner created successfully',
      data: partner
    });

  } catch (error) {
    console.error('Create partner error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create partner' 
    });
  }
};

// PUT update partner
exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company, email, country, status, commissionRate, volume } = req.body;

    const partner = await prisma.partner.findUnique({
      where: { id: parseInt(id) }
    });

    if (!partner) {
      return res.status(404).json({ 
        success: false, 
        message: 'Partner not found' 
      });
    }

    const updated = await prisma.partner.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(company && { company }),
        ...(email && { email }),
        ...(country && { country }),
        ...(status && { status }),
        ...(commissionRate !== undefined && { commissionRate: parseFloat(commissionRate) }),
        ...(volume !== undefined && { volume: parseFloat(volume) })
      }
    });

    res.json({
      success: true,
      message: 'Partner updated successfully',
      data: updated
    });

  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update partner' 
    });
  }
};

// DELETE partner
exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const partner = await prisma.partner.findUnique({
      where: { id: parseInt(id) }
    });

    if (!partner) {
      return res.status(404).json({ 
        success: false, 
        message: 'Partner not found' 
      });
    }

    await prisma.partner.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Partner deleted successfully'
    });

  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete partner' 
    });
  }
};
