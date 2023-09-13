"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateBusinessHoursAction } from "@/actions/availability"
import { DAYS, TIME_OPTIONS } from "@/data/constants"
import { businessHours, type BusinessHours } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError } from "@/lib/utils"
import { businessHoursSchema } from "@/lib/validations/availability"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

interface UpdateBusinessHoursFormProps {
  currentBusinessHours: BusinessHours
  userId: string
  clinicId: number
}

type Inputs = z.infer<typeof businessHoursSchema>

export function UpdateBusinessHoursForm({
  currentBusinessHours,
  userId,
  clinicId,
}: UpdateBusinessHoursFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      mondayStatus: currentBusinessHours.mondayStatus,
      tuesdayStatus: currentBusinessHours.tuesdayStatus,
      wednesdayStatus: currentBusinessHours.wednesdayStatus,
      thursdayStatus: currentBusinessHours.thursdayStatus,
      fridayStatus: currentBusinessHours.fridayStatus,
      saturdayStatus: currentBusinessHours.saturdayStatus,
      sundayStatus: currentBusinessHours.sundayStatus,
      mondayOpening: currentBusinessHours.mondayOpening,
      tuesdayOpening: currentBusinessHours.tuesdayOpening,
      wednesdayOpening: currentBusinessHours.wednesdayOpening,
      thursdayOpening: currentBusinessHours.thursdayOpening,
      fridayOpening: currentBusinessHours.fridayOpening,
      saturdayOpening: currentBusinessHours.saturdayOpening,
      sundayOpening: currentBusinessHours.sundayOpening,
      mondayClosing: currentBusinessHours.mondayClosing,
      tuesdayClosing: currentBusinessHours.tuesdayClosing,
      wednesdayClosing: currentBusinessHours.wednesdayClosing,
      thursdayClosing: currentBusinessHours.thursdayClosing,
      fridayClosing: currentBusinessHours.fridayClosing,
      saturdayClosing: currentBusinessHours.saturdayClosing,
      sundayClosing: currentBusinessHours.sundayClosing,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await updateBusinessHoursAction({ ...data, userId, clinicId })
        form.reset()
        toast.success("Godziny przyjęć zostały zaktualizowane")
        router.refresh()
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-6"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {/* Monday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Poniedziałek</h3>
          </div>

          <FormField
            control={form.control}
            name="mondayStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-primary/90">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(
                          businessHours.mondayStatus.enumValues
                        ).map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("mondayStatus") === "otwarte" && (
            <>
              <FormField
                control={form.control}
                name="mondayOpening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Otwarcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mondayClosing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Zamknięcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Tuesday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Wtorek</h3>
          </div>

          <FormField
            control={form.control}
            name="tuesdayStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-primary/90">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(
                          businessHours.tuesdayStatus.enumValues
                        ).map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("tuesdayStatus") === "otwarte" && (
            <>
              <FormField
                control={form.control}
                name="tuesdayOpening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Otwarcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tuesdayClosing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Zamknięcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Wednesday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Środa</h3>
          </div>

          <FormField
            control={form.control}
            name="wednesdayStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-primary/90">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(
                          businessHours.wednesdayStatus.enumValues
                        ).map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("wednesdayStatus") === "otwarte" && (
            <>
              <FormField
                control={form.control}
                name="wednesdayOpening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Otwarcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wednesdayClosing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Zamknięcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Thursday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Czwartek</h3>
          </div>

          <FormField
            control={form.control}
            name="thursdayStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-primary/90">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(
                          businessHours.thursdayStatus.enumValues
                        ).map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("thursdayStatus") === "otwarte" && (
            <>
              <FormField
                control={form.control}
                name="thursdayOpening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Otwarcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thursdayClosing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Zamknięcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Friday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Piątek</h3>
          </div>

          <FormField
            control={form.control}
            name="fridayStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-primary/90">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(
                          businessHours.fridayStatus.enumValues
                        ).map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("fridayStatus") === "otwarte" && (
            <>
              <FormField
                control={form.control}
                name="fridayOpening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Otwarcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fridayClosing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Zamknięcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Saturday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Sobota</h3>
          </div>

          <FormField
            control={form.control}
            name="saturdayStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-primary/90">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(
                          businessHours.saturdayStatus.enumValues
                        ).map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("saturdayStatus") === "otwarte" && (
            <>
              <FormField
                control={form.control}
                name="saturdayOpening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Otwarcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="saturdayClosing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Zamknięcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Sunday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Niedziela</h3>
          </div>

          <FormField
            control={form.control}
            name="sundayStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-primary/90">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(
                          businessHours.sundayStatus.enumValues
                        ).map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("sundayStatus") === "otwarte" && (
            <>
              <FormField
                control={form.control}
                name="sundayOpening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Otwarcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sundayClosing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">
                      Zamknięcie
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {TIME_OPTIONS?.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Aktualizuj
          <span className="sr-only">Aktualizuj</span>
        </Button>
      </form>
    </Form>
  )
}