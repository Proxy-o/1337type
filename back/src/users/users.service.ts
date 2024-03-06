import { Injectable } from '@nestjs/common';
import { User, Prisma, Wpm } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: { skip?: number; take?: number }): Promise<User[]> {
    const { skip, take } = params;
    const usersWithWpm = await this.prisma.user.findMany({
      include: {
        Wpm: true,
      },
      take,
      skip,
    });

    const usersWithHighestWpm = usersWithWpm.map((user) => {
      const highestWpm = Math.max(...user.Wpm.map((w) => w.value));
      return {
        ...user,
        highestWpm,
      };
    });

    usersWithHighestWpm.sort((a, b) => b.highestWpm - a.highestWpm);

    return usersWithHighestWpm;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async addWpm(params: { data: Prisma.WpmCreateInput }): Promise<Wpm> {
    const { data } = params;
    return this.prisma.wpm.create({
      data,
    });
  }
}
