const { prisma } = require('./index.js');

const createStep = async (req) => {
  const { topicOrder, title, content, topicId } = req;
  const step = await prisma.step.create({
    data: {
      topicOrder,
      title,
      content,
      topicId
    },
    include: {
      topic: true,
      topic: {
        include: {
          subject: true,
          subject: {
            include: {
              createdBy: true,
              lastUpdatedBy: true
            }
          }
        }
      }
    }
  });
  return step;
};

const getAllStepsByTopicId = async (req) => {
  const { topicId } = req;
  const steps = await prisma.step.findMany({
    where: { topicId: Number(topicId) },
    include: {
      topic: true,
      topic: {
        include: {
          subject: true,
          subject: {
            include: {
              createdBy: true,
              lastUpdatedBy: true
            }
          }
        }
      }
    }
  });
  steps.sort((a, b) => {
    return a.topicOrder - b.topicOrder;
  });
  return steps;
};

const getStepById = async (req) => {
  const { id } = req;
  const step = await prisma.step.findUnique({
    where: { id: Number(id) },
    include: {
      topic: true,
      topic: {
        include: {
          subject: true,
          subject: {
            include: {
              createdBy: true,
              lastUpdatedBy: true
            }
          }
        }
      }
    }
  });
  return step;
};

const updateStep = async (req) => {
  const { id, topicOrder, title, content, topicId } = req;
  const step = await prisma.step.update({
    where: { id },
    data: {
      topicOrder,
      title,
      content,
      topicId
    },
    include: {
      topic: true,
      topic: {
        include: {
          subject: true,
          subject: {
            include: {
              createdBy: true,
              lastUpdatedBy: true
            }
          }
        }
      }
    }
  });
  return step;
};

const deleteStep = async (req) => {
  const { id } = req;
  await prisma.step.delete({
    where: {
      id: Number(id)
    }
  });
};

exports.createStep = createStep;
exports.getAllStepsByTopicId = getAllStepsByTopicId;
exports.getStepById = getStepById;
exports.updateStep = updateStep;
exports.deleteStep = deleteStep;
