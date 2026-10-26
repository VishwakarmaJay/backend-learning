import { Booking, Event, Venue } from "../models/index";
import { Lock } from "@sequelize/core";
import AppError from "../utils/appError";
import { Request, Response } from "express";
import { EventService } from "../services/eventServices";
import { EventRepository } from "../repositories/eventRepository";
import sequelize from "@sequelize/core";
import connection from "../config/db";

const eventService = new EventService(new EventRepository());



export const getEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  res.status(200).json({ data: event, message: "Event fetched successfully" });
};

export const getEventList = async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const MAX_LIMIT = 100;
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(req.query.limit) || 10));
  const offset = (page - 1) * limit;

  const filters : eventFilters = {
    title: typeof req.query.title === "string" ? req.query.title : undefined,
    venue: req.query.venue ? Number(req.query.venue) : undefined,   
    from: req.query.from ? new Date(req.query.from as string) : undefined,
    to: req.query.to ? new Date(req.query.to as string) : undefined,
  };


  const { rows, count } = await eventService.eventList({
    limit,
    offset,
    filter : filters,
  });

  res.status(200).json({
    data: rows,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      hasMore: page < Math.ceil(count / limit),
    },
  });
};


export const bookEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const seatCount = Number(req.body?.seatCount ?? 1);

  if (!Number.isSafeInteger(seatCount) || seatCount <= 0) {
    throw new AppError("seatCount must be a positive integer", 400);
  }

  const booking = await connection.transaction(async (transaction) => {
    const event = await Event.findByPk(id, {
      transaction,
      lock: Lock.UPDATE,
    });

    if (!event) {
      throw new AppError("Event not found", 404);
    }

    const venue = await Venue.findByPk(event.venueId, {
      transaction,
    });

    if (!venue) {
      throw new AppError("Venue not found", 404);
    }

    const existingBooking = await Booking.findOne({
      where: {
        eventId: event.id,
        userId,
      },
      transaction,
    });

    if (existingBooking) {
      throw new AppError("You have already booked this event", 409);
    }

    const availableSeats = venue.capacity - event.booked;

    if (seatCount > availableSeats) {
      throw new AppError(
        `Only ${Math.max(availableSeats, 0)} seat(s) are available`,
        409
      );
    }

    const newBooking = await Booking.create(
      {
        eventId: event.id,
        userId,
        seatCount,
        status: "CONFIRMED", 
      },
      { transaction }
    );

    await event.increment("booked", {
      by: seatCount,
      transaction,
    });

    return newBooking;
  });

  res.status(201).json({
    data: booking,
    message: "Event booked successfully",
  });
};
