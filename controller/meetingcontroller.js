const Meeting = require("../model/metting");

exports.SchedulMetting = async (req, res) => {
    try {
        const { date, startTime, endTime, roomId } = req.body;

        // Check for participant availability
        const conflicts = await Meeting.find({
            date: date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
                { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
            ],

        });

        if (conflicts.length > 0) {
            return res.status(400).json({ message: 'Participants are not available at this time' });
        }

        // Check for room availability
        const roomConflicts = await Meeting.find({
            date: date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
                { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
            ],
            roomId: roomId,
        });

        if (roomConflicts.length > 0) {
            return res.status(400).json({ message: 'Room is not available at this time' });
        }

        // Create new meeting
        const newMeeting = new Meeting({
            date,
            startTime,
            endTime,
            roomId,
        });

        await newMeeting.save();

        return res.status(200).json({ message: 'Meeting scheduled successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};