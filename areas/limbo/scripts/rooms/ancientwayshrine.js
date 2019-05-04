'use strict';

const { Broadcast } = require('ranvier');
const { RoomUtil } = require('../../../../../ilvandia-lib/lib/RoomUtil');

module.exports = {
  listeners: {
    channelReceive: state => function (channel, sender, message) {
      if (channel.name !== 'say') {
        return;
      }

      if (!message.toLowerCase().match('mellon')) {
        return;
      }

      const downExit = RoomUtil.getRoomExits(this).find(exit => exit.direction === 'down');
      const downRoom = state.RoomManager.getRoom(downExit.roomId);

      Broadcast.sayAt(sender, "You have spoken 'friend', you may enter. The trap door opens with a *click*");
      downRoom.unlockDoor(this);
      downRoom.openDoor(this);
    },
  }
};
